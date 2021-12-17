import mapboxgl, { Popup } from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CANCUN_COORDINATES, TRANSPORTS, OPPORTUNITIES, TIMEFRAMES, TRANSPORT_COLORS, COLORS } from '../constants';
import useLayerManager from '../hooks/useLayerManager';
import Loader from './Loader';
import LegendBar from './LegendBar'
import useBaseGrid from '../hooks/useBaseGrid';
import useFitMap from '../hooks/useFitMap';
import useCityData from '../hooks/useCityData';
import useEconomicZones from '../hooks/useEconomicZones';
import useMap from '../hooks/useMap';
import ControlsCard from './ControlsCard';
import useMarginalizationLayers from '../hooks/useMarginalizationLayers'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

const getHexagonId = (hexagonId, medium, step) => `${hexagonId}-${medium}-${step}`;
const defaultOpportunity = Object.keys(OPPORTUNITIES)[0];
const defaultTransport = TRANSPORTS[0];
const defaultTimeframe = TIMEFRAMES[1];
const defaultParams = {
  hexagon: undefined,
  transport: [defaultTransport],
  timeframe: defaultTimeframe, 
  opportunity: defaultOpportunity,
  agebs: false,
}
const count = (array, property) => array.reduce((acc, item) => acc + item.properties[property], 0);
const popup = new Popup({
  className: 'black-popup',
  closeButton: false,
  closeOnClick: false
});

let currentTimeframe = defaultTimeframe
let currentTransport =  [defaultTransport]

function Map({ city, data }) {
  const [map, mapLoaded] = useMap({ center: CANCUN_COORDINATES });
  const {
    state,
    current,
    legend,
    metadata,
    add,
    show,
    hide,
    hideAll,
    geojson,
  } = useLayerManager(map);
  useFitMap(map, geojson?.features)
  const {features, metadata: cityData} = useCityData(data);
  const [loading, setLoading] = useState(false)
  const [rendered, setRendered] = useState(false);
  const [params, setParams] = useState(defaultParams)
  const { load: loadGrid, layerName: gridId } = useBaseGrid('grid')
  const { load: loadAgebs, show: showAgebs, hide: hideAgebs, legend: agebLegend } = useMarginalizationLayers()
  const getCurrentTimeframe = () => currentTimeframe
  const getCurrentTransport = () => currentTransport

  useEffect(() => {
    if (map && mapLoaded && features.length > 0 && !rendered) {
      // Load base grid
      loadGrid(map, features)
      loadAgebs(map)
      map.on('mousemove', gridId, (e) => {
        popup
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.description)
          .addTo(map);
      });
      map.on('mouseleave', gridId, () => {
        popup.remove();
      });
      // Load opportunities
      Object.keys(OPPORTUNITIES).forEach((key) => {
        let maxValue = 0;
        const filteredFeatures = features.filter((item) => {
          if (item.properties[key] > maxValue) {
            maxValue = item.properties[key];
          }
          return item.properties[key] > 0
        });
        if (!(key in state)) {
          add({
            map,
            legendTitle: `Número de ${OPPORTUNITIES[key].toLowerCase()}`,
            id: key,
            features: filteredFeatures,
            property: key,
            maxValue,
            visible: false,
            stepSize: 10,
            beforeId: gridId,
          });
        }
      });

      // Hexagon click listener
      map.on('click', gridId, async (e) => {
        setLoading(true)
        const feature = e.features[0].properties
        const featureId = e.features[0].properties.h3_ddrs;
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${city}/features/${featureId}.json`);
          const text = await response.text();
          const json = JSON.parse(text);

          // Create 9 isochrones variant layers
          [...TRANSPORTS].reverse().forEach((med, mediumIndex) => {
            [...TIMEFRAMES].reverse().forEach((step) => {
              const featureIds = Object.keys(json)
              const filteredIds = featureIds.filter((id) => json[id][mediumIndex] && json[id][mediumIndex] <= step && data[id]);
              const filteredFeatures = filteredIds.map((id) => ({
                ...data[id],
                properties: {
                  ...data[id].properties,
                  [med]: json[id][mediumIndex],
                  description: `${json[id][mediumIndex]} minutos`
                },
              }));

              // Include clicked feature.
              filteredFeatures.push({
                ...data[featureId],
                properties: {
                  ...data[featureId].properties,
                  [med]: 1,
                  selected: true,
                  description: `15 minutos`
                },
              })
              
              console.log('add', COLORS[TRANSPORT_COLORS[med]])
              add({
                map,
                legendTitle: 'Tiempo de traslado',
                unit: 'min',
                id: getHexagonId(featureId, med, step),
                features: filteredFeatures,
                property: med,
                maxValue: step,
                visible: false,
                beforeId: gridId,
                stepSize: Math.floor(step / 15),
                reverseColors: true,
                colors: COLORS[TRANSPORT_COLORS[med]],
                metadata: {
                  opportunities: {
                    'Personal ocupado': count(filteredFeatures, 'jobs_w'),
                    Empresas: count(filteredFeatures, 'empresas'),
                    Clínicas: count(filteredFeatures, 'clinicas'),
                    Escuelas: count(filteredFeatures, 'escuelas'),
                    'Zonas turísticas': count(filteredFeatures, 'destinos'),
                    Estaciones: count(filteredFeatures, 'Estaciones'),
                  }
                }
              });

              map.on('mousemove', getHexagonId(featureId, med, step), (e) => {
                popup
                  .setLngLat(e.lngLat)
                  .setHTML(e.features[0].properties.description)
                  .addTo(map);
              });
              map.on('mouseleave', getHexagonId(featureId, med, step), () => {
                popup.remove();
              });
            });
          });
        } catch (e) {
          console.log(`Failed when downloading feature data: ${e.message}`);
        } finally {
          setLoading(false)
        }
        hideAll(map)
        getCurrentTransport().forEach((transport) => {
          show(map, getHexagonId(featureId, transport, getCurrentTimeframe()));
        })
        setParams({
          ...params,
          timeframe: getCurrentTimeframe(),
          transport: getCurrentTransport(),
          opportunity: undefined,
          hexagon: {
            id: featureId,
            ...feature,
          },
        })
      });
      setRendered(true)
    }
  }, [map, mapLoaded, features, rendered])

  const handleOpportunityChange = (event) => {
    const nextOpportunity = event.target.value;
    hideAll(map)
    hideAgebs(map)
    show(map, nextOpportunity);
    setParams({
      ...params,
      opportunity: nextOpportunity,
      hexagon: undefined,
      agebs: false,
    })
  };

  const handleEconomicChange = () => {
    if (params.agebs) {
      hideAgebs(map)
      setParams({
        ...params,
        agebs: false,
      })
    } else {
      showAgebs(map)
      setParams({
        ...params,
        agebs: true,
      })
    }
  };

  const handleTimeframeChange = (value) => {
    if (params.hexagon?.id) {
      hideAll(map)
      params.transport.forEach(transport => {
        show(map, getHexagonId(params.hexagon.id, transport, value));
      })
    }
    setParams({
      ...params,
      timeframe: value,
    })
    currentTimeframe = value;
  };
  
  const handleTransportChange = (value) => {
    if (params.hexagon?.id && value) {
    let newTransportSelection
      if (params.transport.includes(value)) {
        hide(map, getHexagonId(params.hexagon.id, value, params.timeframe));
         newTransportSelection = [...params.transport].filter((item) => item !== value);
      } else {
        show(map, getHexagonId(params.hexagon.id, value, params.timeframe));
         newTransportSelection = [...params.transport, value]
      }
      setParams({ 
        ...params, 
        transport: newTransportSelection
      })
      currentTransport = newTransportSelection;
    } 
  };

  return (
    <>
      <ControlsCard
        hexagon={params.hexagon}
        transport={params.transport}
        timeframe={params.timeframe}
        opportunity={params.opportunity}
        cityData={cityData}
        geojson={geojson}
        economicLayer={params.agebs}
        reachableOpportunities={metadata.opportunities}
        legendTitle={legend.title}
        onMediumChange={handleTransportChange}
        onTimeStepChange={handleTimeframeChange}
        onOpportunityChange={handleOpportunityChange}
        onEconomicLayerChange={handleEconomicChange}
      />
      {
        params.transport.length === 1 && ( 
          <LegendBar 
          geojson={geojson}
          legendTitle={legend.title}
          legendDictionary={legend.intervals}
          current={current}
        />
        )
      }
      <div id="map" className="w-screen h-screen" />
      <Loader loading={loading}/>
    </>
  );
};

Map.propTypes = {
  city: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Map;
