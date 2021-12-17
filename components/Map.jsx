import mapboxgl, { Popup } from 'mapbox-gl';
import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { CANCUN_COORDINATES, MEDIUMS, OPPORTUNITIES, TIME_STEPS } from '../constants';
import useLayerManager from '../hooks/useLayerManager';
import InfoCard from './InfoCard';
import Loader from './Loader';
import LegendBar from './LegendBar'
import useBaseGrid from '../hooks/useBaseGrid';
import useFitMap from '../hooks/useFitMap';

// Mexico
import useEconomicZones from '../hooks/useEconomicZones';
import useMap from '../hooks/useMap';
import TimeControls from './TimeControls';
import TransportControls from './TransportControls';
import LayerControls from './LayerControls';
import ControlsCard from './ControlsCard';


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

const getHexagonId = (hexagonId, medium, step) => `${hexagonId}-${medium}-${step}`;
const defaultOpportunity = Object.keys(OPPORTUNITIES)[0];
const defaultMedium = MEDIUMS[0];
const defaultTimeStep = TIME_STEPS[1];
const count = (array, property) => array.reduce((acc, item) => acc + item.properties[property], 0);
const popup = new Popup({
  className: 'black-popup',
  closeButton: false,
  closeOnClick: false
});

let currentTimestep = defaultTimeStep
let currentMedium = defaultMedium

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
    geojson,
  } = useLayerManager(map);
  useFitMap(map, geojson?.features)
  const [loading, setLoading] = useState(false)
  const [rendered, setRendered] = useState(false);
  const [opportunity, setOpportunity] = useState(defaultOpportunity);
  const [hexagon, setHexagon] = useState();
  const [medium, setMedium] = useState(defaultMedium);
  const [timeStep, setTimeStep] = useState(defaultTimeStep);
  const [features, setFeatures] = useState(Object.values(data));
  const [opportunities, setOpportunities] = useState({});
  const { load: loadGrid, layerName: gridId } = useBaseGrid('grid')
  const { load: loadAgebs, show: showAgebs, hide: hideAgebs, legend: agebLegend } = useEconomicZones()

  
  const getCurrentTimestep = () => currentTimestep
  const getCurrentMedium = () => currentMedium

  useEffect(() => {
    if (data) {
      const nextFeatures = Object.values(data)
      setFeatures(nextFeatures);
      setOpportunities({
        'Personal ocupado': count(nextFeatures, 'jobs_w'),
        Empresas: count(nextFeatures, 'empresas'),
        Clínicas: count(nextFeatures, 'clinicas'),
        Escuelas: count(nextFeatures, 'escuelas'),
        'Zonas turísticas': count(nextFeatures, 'destinos'),
      })
    }
  }, [data])



  useEffect(() => {
    if (map && mapLoaded && features.length > 0 && !rendered) {
      // Load base grid
      loadGrid(map, features)
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

      // Load click listener
      map.on('click', gridId, async (e) => {
        setLoading(true)
        const feature = e.features[0].properties
        const featureId = e.features[0].properties.h3_ddrs;
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${city}/features/${featureId}.json`);
          const text = await response.text();
          const json = JSON.parse(text);

          // Create 9 isochrone variant layers
          MEDIUMS.forEach((med, mediumIndex) => {
            TIME_STEPS.forEach((step) => {
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
        // Show default isochrone
        console.log(getHexagonId(featureId, getCurrentMedium(), getCurrentTimestep()))
        show(map, getHexagonId(featureId, getCurrentMedium(), getCurrentTimestep()));
        setHexagon({
          id: featureId,
          ...feature,
        })
      });
      setOpportunity(undefined);
      setRendered(true)
    }
  }, [map, mapLoaded, features, rendered])

  const handleOpportunityChange = (event) => {
    const nextOpportunity = event.target.value;
    show(map, nextOpportunity);
    setOpportunity(nextOpportunity);
    setHexagon(undefined);
    // hideAgebs()
    // setEconomicTiles(false)
  };

  const handleMediumChange = (value) => {
    if (hexagon?.id) {
      show(map, getHexagonId(hexagon.id, value, timeStep));
    }
    setMedium(value);
    currentMedium = value;
  };
  
  const handleTimeStepChange = (value) => {
    if (hexagon?.id) {
      show(map, getHexagonId(hexagon.id, medium, value));
    }
    setTimeStep(value);
    currentTimestep   = value;
  };

  return (
    <>
      <ControlsCard
        hexagon={hexagon}
        reachableOpportunities={metadata.opportunities}
        cityData={opportunities}
        medium={medium}
        onMediumChange={handleMediumChange}
        timeStep={timeStep}
        onTimeStepChange={handleTimeStepChange}
        onOpportunityChange={handleOpportunityChange}
        opportunity={opportunity}
        geojson={geojson}
        legendTitle={legend.title}
      />
      {/* <div className="z-30 fixed top-3 right-14">
        <TransportControls
          hexagon={hexagon}
          medium={medium}
          onMediumChange={handleMediumChange}
        />
        <div className="mb-3"></div>
        <TimeControls
          hexagon={hexagon}
          timeStep={timeStep}
          onTimeStepChange={handleTimeStepChange}
        />
      </div> */}
      {/* <LayerControls      /> */}
      <LegendBar 
        geojson={geojson}
        legendTitle={legend.title}
        legendDictionary={legend.intervals}
        current={current}
      />
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
