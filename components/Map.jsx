import mapboxgl, { Popup } from 'mapbox-gl';
import React, { useEffect, useState, useMemo, useCallback, createElement } from 'react';
import PropTypes from 'prop-types';
import { MEXICO_COORDINATES, TRANSPORTS, OPPORTUNITIES, TIMEFRAMES, TRANSPORT_COLORS, COLORS, TRANSPORT_TRANSLATIONS } from '../constants';
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
import MapControls from './MapControls';
import LayerControls from './LayerControls';
import CitiesOverview from './CitiesOverview';
import {useRouter} from 'next/router';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

const buildCityMarker = (color) => {
  const container = document.createElement('div')
  container.className = 'flex items-center justify-center relative'
  const pulse = document.createElement('div')
  pulse.className = 'animate-pulse absolute rounded-full h-4 w-4 opacity-5'
  pulse.style.backgroundColor = color
  const dot = document.createElement('div')
  dot.className = 'absolute rounded-full h-2 w-2'
  dot.style.backgroundColor = color
  container.appendChild(dot)
  container.appendChild(pulse)
  return container
}

const displayCityMarkers = (map, cities, {onClick}) => {
  const cityMarkers = []
  Object.keys(cities).forEach(cty => {
    const marker = buildCityMarker(cities[cty].color)
    marker.addEventListener('click', () => { onClick(cty) })
    new mapboxgl.Marker(marker).setLngLat(cities[cty].coordinates).addTo(map)
    cityMarkers.push(marker)
  })
  return cityMarkers
}

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

function Map({ city, data, cities, onCityChange }) {
  const router = useRouter();
  const [map, mapLoaded] = useMap({ center: MEXICO_COORDINATES });
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
  const [scenario, setScenario] = useState()
  const {features, metadata: cityData} = useCityData(data);
  const [cityMarkers, setCityMarkers] = useState([])
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState(defaultParams)
  const [chartData, setChartData] = useState({})
  const { load: loadGrid } = useBaseGrid()
  const { load: loadAgebs, show: showAgebs, hide: hideAgebs, legend: agebLegend } = useMarginalizationLayers()
  const getCurrentTimeframe = () => currentTimeframe
  const getCurrentTransport = () => currentTransport
  
  const handleCityChange = (cty) => {
    map.flyTo({
      center: cities[cty].coordinates,
      zoom: 11,
      duration: 2000,
      offset: [100, 50]
    })
    onCityChange(cty)
    setScenario(cities[cty].scenarios[0].fields.bucketName)
    router.query = {
      ...router.query,
      city: cty,
      scenario: cities[cty].scenarios[0].fields.bucketName,
    };
    router.replace(router);
  }

  const handleScenarioChange = (sce) => {
    setScenario(sce)
    router.query = {
      ...router.query,
      scenario: sce,
    };
    router.replace(router);
  }

  useEffect(() => {
    if (city && cityMarkers.length > 0) {
      cityMarkers.forEach(marker => marker.remove())
      setCityMarkers([])
    } else if (map && cities && !city && !cityMarkers.length) {
      setCityMarkers(displayCityMarkers(map, cities, { onClick: handleCityChange }))
    }    
  }, [map, cities, city, cityMarkers, onCityChange])

  useEffect(() => {
    if (map && mapLoaded && features.length > 0) {
      // Load base grid
      loadGrid(map, features, `base-grid-${city}`)
      // loadAgebs(map) // FIXME: Load once.
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
            beforeId: `base-grid-${city}`,
          });
        }
      });

      // Hexagon click listener
      map.on('click', `base-grid-${city}`, async (e) => {
        setLoading(true)
        const feature = e.features[0].properties
        const featureId = e.features[0].properties.h3_ddrs;
        router.query = { 
          ...router.query,
          featureId
        }
        router.replace(router)
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${city}/${scenario}/${featureId}.json`);
          const text = await response.text();
          const json = JSON.parse(text);
          const incomingChartData = {};
          // Create 9 isochrones variant layers
          [...TIMEFRAMES].reverse().forEach((step) => {
            const featureIds = Object.keys(json)
            const transportReach = TRANSPORTS.map((transport, index) => {
              const filteredIds = featureIds.filter((id) => json[id][index] && (json[id][index] <= step) && data[id])
              const features = filteredIds.map((id) => ({
                ...data[id],
                properties: {
                  ...data[id].properties,
                  [transport]: json[id][index],
                  description: `${json[id][index]} minutos`
                },
              }));
              // Include clicked feature.
              features.push({
                ...data[featureId],
                properties: {
                  ...data[featureId].properties,
                  [transport]: 1,
                  selected: true,
                  description: `15 minutos`
                },
              })
              return [transport, features]
            })
            const sortedTransports = transportReach.sort((a, b)  => b[1].length - a[1].length);
            sortedTransports.forEach(([transport, features]) => {
              add({
                map,
                legendTitle: 'Tiempo de traslado',
                unit: 'min',
                id: getHexagonId(featureId, transport, step),
                features: features,
                property: transport,
                maxValue: step,
                visible: false,
                beforeId: `base-grid-${city}`,
                stepSize: Math.floor(step / 15),
                reverseColors: true,
                colors: COLORS[TRANSPORT_COLORS[transport]],
              });
              add({
                map,
                legendTitle: 'Tiempo de traslado',
                unit: 'min',
                id: getHexagonId(featureId, transport, step) + '-solid',
                features: features,
                property: transport,
                maxValue: step,
                solid:  true,
                opacity: 1,
                visible: false,
                beforeId: `base-grid-${city}`,
                stepSize: Math.floor(step / 15),
                reverseColors: true,
                colors: COLORS[TRANSPORT_COLORS[transport]],
              });
              map.on('mousemove', getHexagonId(featureId, transport, step), (e) => {
                popup
                  .setLngLat(e.lngLat)
                  .setHTML(e.features[0].properties.description)
                  .addTo(map);
              });
              map.on('mouseleave', getHexagonId(featureId, transport, step), () => {
                popup.remove();
              });

              // Get chart data
              if (!(step in incomingChartData)) {
                incomingChartData[step] = {};
              }
              incomingChartData[step][transport] = {
                facilities: {
                  Empresas: count(features, 'empress'),
                  Clínicas: count(features, 'clinics'),
                  Escuelas: count(features, 'escuels'),
                },
                opportunities: {
                  'Personal ocupado': count(features, 'jobs_w'),
                }
              }
            });
          });
          console.log(incomingChartData)
          setChartData(incomingChartData)
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
    }
  }, [map, mapLoaded, features])

  const handleOpportunityChange = (nextOpportunity) => {
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
      if (params.transport.length ===  1) {
        show(map, getHexagonId(params.hexagon.id, params.transport[0], value));
      } else if (params.transport.length > 1) {
        params.transport.forEach(transport => {
          show(map, getHexagonId(params.hexagon.id, transport, value) + '-solid');
        }) 
      }
    }
    setParams({
      ...params,
      timeframe: value,
    })
    currentTimeframe = value;
  };
  
  const handleTransportChange = (value) => {
    if (params.hexagon?.id && value) {
      hideAll(map)
      let newTransportSelection
      if (params.transport.includes(value)) {
          newTransportSelection = [...params.transport].filter((item) => item !== value);
      } else {
        newTransportSelection = [...params.transport, value]
      }
      if (newTransportSelection.length === 1) {
        show(map, getHexagonId(params.hexagon.id, newTransportSelection[0], params.timeframe));
      } else if (newTransportSelection.length > 1) {
        newTransportSelection.forEach(transport => {
          show(map, getHexagonId(params.hexagon.id, transport, params.timeframe) + '-solid');
        }) 
      }
      setParams({ 
        ...params, 
        transport: newTransportSelection
      })
      currentTransport = newTransportSelection;
    } 
  };

  const opportunitiesChartData = useMemo(() => {
    if (params.hexagon) {
      return {
        labels: Object.keys(chartData[params.timeframe][TRANSPORTS[0]].opportunities),
        datasets:  Object.keys(chartData[params.timeframe]).map((transport) => ({
            label: TRANSPORT_TRANSLATIONS[transport],
            data: Object.keys(chartData[params.timeframe][transport].opportunities).map((opportunity) =>  chartData[params.timeframe][transport].opportunities[opportunity] / cityData[opportunity]),
            backgroundColor: COLORS[TRANSPORT_COLORS[transport]][0]
        })),
      }
    }
    return null
  }, [chartData, params.timeframe, params.hexagon])

  const facilitiesChartData = useMemo(() => {
    if (params.hexagon) {
      return {
        labels: Object.keys(chartData[params.timeframe][TRANSPORTS[0]].facilities),
        datasets:  Object.keys(chartData[params.timeframe]).map((transport) => ({
            label: TRANSPORT_TRANSLATIONS[transport],
            data: Object.keys(chartData[params.timeframe][transport].facilities).map((facility) =>  chartData[params.timeframe][transport].facilities[facility] / cityData[facility]),
            backgroundColor: COLORS[TRANSPORT_COLORS[transport]][0]
        })),
      }
    }
    return null
  }, [chartData, params.timeframe, params.hexagon])

  return(
    <>
    <MapControls
      onScenarioChange={handleScenarioChange}
      transport={params.transport}
      onMediumChange={handleTransportChange}
      timeframe={params.timeframe}
      onTimeStepChange={handleTimeframeChange} 
      hexagonDisabled={!params.hexagon}
      cityDisabled={!city}
      opportunity={params.opportunity}
      onOpportunityChange={handleOpportunityChange}
      city={cities?.[city]}
      onCityChange={handleCityChange}
      cities={Object.values(cities || {})}
      geojson={geojson}
      legendTitle={legend.title}
    />
      { city ? <ControlsCard
        title={cities[city]?.name}
        cityData={cityData}
        reachableOpportunities={opportunitiesChartData}
        reachableFacilities={facilitiesChartData}
      /> : null}
      {
        cities && !city ?(
            <CitiesOverview 
            cities={Object.values(cities || {})}
            />
        ) : null
      }
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
      <LayerControls 
        economicLayer={params.agebs}
        onEconomicLayerChange={handleEconomicChange}
      />
      <div id="map" className="w-screen h-screen" />
      <Loader loading={loading}/>
    </>)
};

Map.propTypes = {
  city: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Map;
