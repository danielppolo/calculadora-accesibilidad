import mapboxgl, { Popup } from 'mapbox-gl';
import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  MEXICO_COORDINATES,
  TRANSPORTS,
  OPPORTUNITIES,
  TIMEFRAMES,
  TRANSPORT_COLORS,
  COLORS,
  TRANSPORT_TRANSLATIONS,
  OPPORTUNITY_TIMEFRAMES,
} from '../constants';
import useLayerManager from '../hooks/useLayerManager';
import Loader from './Loader';
import LegendBar from './LegendBar';
import useBaseGrid from '../hooks/useBaseGrid';
import useFitMap from '../hooks/useFitMap';
import useCityData from '../hooks/useCityData';
import useMap from '../hooks/useMap';
import ControlsCard from './ControlsCard';
import useMarginalizationLayers from '../hooks/useMarginalizationLayers';
import MapControls from './MapControls';
import CitiesOverview from './CitiesOverview';
import getHexagonId from '../utils/getHexagonId';
import getOpportunityId from '../utils/getOpportunityId';
import count from '../utils/countFeatures';
import CreditsCard from './CreditsCard';
import useCityMarkers from '../hooks/useCityMarkers';
import usePopulationDensity from '../hooks/usePopulationDensity';
import useNationalRoadNetwork from '../hooks/useNationalRoadNetwork';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;

const cityGridId = (cityId) => `${cityId}-grid`;
const cityOpportunityId = (opportunity, city) => `${city}-${opportunity}`;
const defaultOpportunity = Object.keys(OPPORTUNITIES)[0];
const defaultTransport = TRANSPORTS[0];
const defaultTimeframe = 30;
const defaultParams = {
  visualization: 'opportunities',
  opportunity: defaultOpportunity,
  hexagon: undefined,
  transport: [],
  timeframe: undefined,
  agebs: false,
  density: false,
  raods: false,
};
const popup = new Popup({
  className: 'black-popup',
  closeButton: false,
  closeOnClick: false,
});

let currentTimeframe = defaultTimeframe;
let currentTransport = [defaultTransport];

function Map({
  city, data, cities, onCityChange,
}) {
  const router = useRouter();
  const [map, mapLoaded] = useMap({ center: MEXICO_COORDINATES });
  const {
    state,
    current,
    legend,
    add,
    show,
    hideAll,
    geojson,
  } = useLayerManager(map);
  useFitMap(map, geojson.features);
  const [scenario, setScenario] = useState();
  const { features, metadata: cityData } = useCityData(data);
  const [displayCityMarkers, removeCityMarkers, cityMarkers] = useCityMarkers();
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({...defaultParams});
  const [chartData, setChartData] = useState({});
  const { load: loadBaseGrid, state: gridState } = useBaseGrid();
  const {
    load: loadAgebs, show: showAgebs, hide: hideAgebs, legend: agebLegend,
  } = useMarginalizationLayers();
  const {
    load: loadDensity, show: showDensity, hide: hideDensity, legend: densityLegend,
  } = usePopulationDensity();
  const {
    load: loadRoads, show: showRoads, hide: hideRoads, legend: roadsLegend,
  } = useNationalRoadNetwork();
  const getCurrentTimeframe = () => currentTimeframe;
  const getCurrentTransport = () => currentTransport;
  
  const handleOpportunityChange = useCallback((nextOpportunity) => {
    hideAll(map);
    hideAgebs(map);
    show(map, cityOpportunityId(nextOpportunity, city));
    setParams({
      ...params,
      opportunity: nextOpportunity,
      hexagon: undefined,
      agebs: false,
      timeframe: undefined,
      transport: []
    });
    router.query = {
      ...router.query,
      opportunity: nextOpportunity,
      featureId: undefined,
    };
    router.replace(router);
  }, [city, hideAgebs, hideAll, map, params, router, show]);

  const handleCityChange = useCallback(
    (cty) => {
      map.flyTo({
        center: cities[cty].coordinates,
        zoom: 11,
        duration: 2000,
        offset: [100, 50],
      });
      hideAll(map);
      onCityChange(cty);
      setScenario(cities[cty].scenarios[0].fields.bucketName);
      router.query = {
        ...router.query,
        city: cty,
        scenario: cities[cty].scenarios[0].fields.bucketName,
      };
      router.replace(router);
      setParams(defaultParams);
    },
    [cities, map, onCityChange, router, setParams],
  );

  const resetMap = () => {
    map.flyTo({
      center: MEXICO_COORDINATES,
      zoom: 4.5,
      duration: 2000,
    });
    onCityChange(undefined);
  };

  useEffect(() => {
    if (city && cityMarkers.length > 0) {
      removeCityMarkers()
    } else if (map && cities && !city && !cityMarkers.length) {
      displayCityMarkers(map, cities, { onClick: handleCityChange })
    }
  }, [map, cities, city, onCityChange, handleCityChange, displayCityMarkers]);

  useEffect(() => {
    if (map && mapLoaded && city) {
      loadBaseGrid(map, features, cityGridId(city), popup);
      loadAgebs(map);
      loadDensity(map);
      loadRoads(map);
      
      // Load opportunities
      Object.keys(OPPORTUNITIES).forEach((opp) => {
        let maxValue = 0;
        const filteredFeatures = features.filter((item) => {
          if (item.properties[opp] > maxValue) {
            maxValue = item.properties[opp];
          }
          return item.properties[opp] > 0;
        });
        if (!(opp in state)) {
          add({
            map,
            legendTitle: `Número de ${OPPORTUNITIES[opp].toLowerCase()}`,
            id: cityOpportunityId(opp, city),
            features: filteredFeatures,
            property: opp,
            maxValue,
            visible: false,
            stepSize: 6,
            colors: ['#7054BC', '#F1BB43'],
            beforeId: cityGridId(city),
          });
        }
      });
      
      // Load static map
      Object.keys(OPPORTUNITIES).forEach((opp) => {
        TRANSPORTS.forEach((tra)=> {
          OPPORTUNITY_TIMEFRAMES.forEach((tm) => {
            const key = getOpportunityId(opp, tra, tm)

            let maxValue = 0;
            const filteredFeatures = features.filter((item) => {
              if (item.properties[key] > maxValue) {
                maxValue = item.properties[key];
              }
              return item.properties[key] > 0;
            });
            if (!(key in state)) {
              add({
                map,
                legendTitle: `Número de ${OPPORTUNITIES[opp].toLowerCase()} alcanzables`,
                id: cityOpportunityId(key, city),
                features: filteredFeatures,
                property: key,
                maxValue,
                visible: false,
                stepSize: 6,
                colors: ['#7054BC', '#F1BB43'],
                beforeId: cityGridId(city),
              });
            }
          })
        })
      });

      // Display default opportunity on city change.
      show(map, cityOpportunityId(defaultOpportunity, city));
      setParams({
        ...params,
        opportunity: defaultOpportunity,
      });
      router.query = {
        ...router.query,
        opportunity: defaultOpportunity,
      };
      router.replace(router);
    }
  }, [map, mapLoaded, city]);

  useEffect(() => {
    if (map && mapLoaded && features.length > 0 && params.visualization === 'isocrones') {
      // Hexagon click listener
      map.on('click', cityGridId(city), async (e) => {
        setLoading(true);
        const feature = e.features[0].properties;
        const featureId = e.features[0].properties.h3_ddrs;
        router.query = {
          ...router.query,
          featureId,
        };
        router.replace(router);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${city}/${scenario}/${featureId}.json`);
          const text = await response.text();
          const json = JSON.parse(text);
          const incomingChartData = {};
          // Create 9 isochrones variant layers
          [...TIMEFRAMES].reverse().forEach((step) => {
            const featureIds = Object.keys(json);
            const transportReach = TRANSPORTS.map((transport, index) => {
              const filteredIds = featureIds
                .filter((id) => json[id][index] && (json[id][index] <= step) && data[id]);
              const filteredFeatures = filteredIds.map((id) => ({
                ...data[id],
                properties: {
                  ...data[id].properties,
                  [transport]: json[id][index],
                  description: `${json[id][index]} minutos`,
                },
              }));
              // Include clicked feature.
              filteredFeatures.push({
                ...data[featureId],
                properties: {
                  ...data[featureId].properties,
                  [transport]: 1,
                  selected: true,
                  description: '15 minutos',
                },
              });
              return [transport, filteredFeatures];
            });
            const sortedTransports = transportReach.sort((a, b) => b[1].length - a[1].length);
            sortedTransports.forEach(([transport, features]) => {
              add({
                map,
                legendTitle: 'Tiempo de traslado',
                unit: 'min',
                id: getHexagonId(featureId, transport, step),
                features,
                property: transport,
                maxValue: step,
                visible: false,
                beforeId: cityGridId(city),
                stepSize: Math.floor(step / 15),
                reverseColors: true,
                colors: COLORS[TRANSPORT_COLORS[transport]],
              });
              add({
                map,
                legendTitle: 'Tiempo de traslado',
                unit: 'min',
                id: getHexagonId(featureId, transport, step, { solid: true }),
                features,
                property: transport,
                maxValue: step,
                solid: true,
                opacity: 1,
                visible: false,
                beforeId: cityGridId(city),
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
                },
              };
            });
          });
          setChartData(incomingChartData);
        } catch (e) {
          console.log(`Failed when downloading feature data: ${e.message}`);
        } finally {
          setLoading(false);
        }

        hideAll(map);

        getCurrentTransport().forEach((transport) => {
          show(map, getHexagonId(featureId, transport, getCurrentTimeframe()));
        });
        setParams({
          ...params,
          timeframe: getCurrentTimeframe(),
          transport: getCurrentTransport(),
          opportunity: undefined,
          hexagon: {
            id: featureId,
            ...feature,
          },
        });
      });
    }
  }, [map, mapLoaded, features, scenario, params.visualization]);

  const handleScenarioChange = (sce) => {
    setScenario(sce);
    router.query = {
      ...router.query,
      scenario: sce,
    };
    router.replace(router);
  };

  const handleEconomicChange = () => {
    if (params.agebs) {
      hideAgebs(map);
      setParams({
        ...params,
        agebs: false,
      });
    } else {
      showAgebs(map);
      setParams({
        ...params,
        agebs: true,
      });
    }
  };

  const handleRoadChange = () => {
    if (params.roads) {
      hideRoads(map);
      setParams({
        ...params,
        roads: false,
      });
    } else {
      showRoads(map);
      setParams({
        ...params,
        roads: true,
      });
    }
  };

  const handleDensityChange = () => {
    if (params.density) {
      hideDensity(map);
      setParams({
        ...params,
        density: false,
      });
    } else {
      showDensity(map);
      setParams({
        ...params,
        density: true,
      });
    }
  };

  const handleTimeframeChange = (value) => {
    if (params.hexagon && params.hexagon.id) {
      hideAll(map);
      if (params.transport.length === 1) {
        show(map, getHexagonId(params.hexagon.id, params.transport[0], value));
      } else if (params.transport.length > 1) {
        params.transport.forEach((transport) => {
          show(map, getHexagonId(params.hexagon.id, transport, value, { solid: true }));
        });
      }
    } else if (value) {
      hideAll(map);
      show(map, cityOpportunityId(getOpportunityId(params.opportunity, (params.transport || defaultTransport), value), city));
    }

    setParams({
      ...params,
      timeframe: value,
      transport: params.transport || defaultTransport
    });
    currentTimeframe = value;
    router.query = {
      ...router.query,
      timeframe: value,
    };
    router.replace(router);
  };

  const handleTransportChange = (value) => {
    if (params.hexagon && params.hexagon.id && value) {
      hideAll(map);
      let newTransportSelection;
      if (params.transport.includes(value)) {
        newTransportSelection = [...params.transport].filter((item) => item !== value);
      } else {
        newTransportSelection = [...params.transport, value];
      }
      if (newTransportSelection.length === 1) {
        show(map, getHexagonId(params.hexagon.id, newTransportSelection[0], params.timeframe));
      } else if (newTransportSelection.length > 1) {
        newTransportSelection.forEach((transport) => {
          show(map, getHexagonId(params.hexagon.id, transport, params.timeframe, { solid: true }));
        });
      }
      setParams({
        ...params,
        transport: newTransportSelection,
      });
      currentTransport = newTransportSelection;
      router.query = {
        ...router.query,
        transport: newTransportSelection.join(','),
      };
      router.replace(router);
    } else if (value) {
      hideAll(map);
      show(map, cityOpportunityId(getOpportunityId(params.opportunity, value, (params.timeframe || defaultTimeframe)), city));
      setParams({
        ...params,
        transport: [value],
        timeframe: params.timeframe || defaultTimeframe,
      });
      currentTransport = [value];
    }
  };

  const handleVisualizationChange = (value) => {
    setParams({
      ...defaultParams,
      visualization: value,
    });
  }

  const buildChartDataset = useCallback((key) => {
    if (params.hexagon) {
      return {
        labels: Object.keys(chartData[params.timeframe][TRANSPORTS[0]][key]),
        datasets: Object.keys(chartData[params.timeframe]).map((transport) => ({
          label: TRANSPORT_TRANSLATIONS[transport],
          data: Object.keys(chartData[params.timeframe][transport][key])
            .map((prop) => {
              const value = chartData[params.timeframe][transport][key][prop];
              const total = cityData[prop];
              return (value / total) * 100;
            }),
          backgroundColor: COLORS[TRANSPORT_COLORS[transport]][0],
        })),
      };
    }
    return null;
  }, [params.hexagon, params.timeframe, chartData, cityData]);

  
  const opportunitiesChartData = useMemo(() => buildChartDataset('opportunities'), [buildChartDataset]);
  const facilitiesChartData = useMemo(() => buildChartDataset('facilities'), [buildChartDataset]);

  return (
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
        city={cities && city && cities[city]}
        onCityChange={handleCityChange}
        cities={Object.values(cities || {})}
        scenario={scenario}
        economicLayer={params.agebs}
        onEconomicLayerChange={handleEconomicChange}
        densityLayer={params.density}
        onDensityLayerChange={handleDensityChange}
        roadsLayer={params.roads}
        onRoadsLayerChange={handleRoadChange}
        visualization={params.visualization}
        onVisualizationChange={handleVisualizationChange}
        resetMap={resetMap}
      />
      { city ? (
        <ControlsCard
          title={cities[city].name}
          cityData={cityData}
          reachableOpportunities={opportunitiesChartData}
          reachableFacilities={facilitiesChartData}
        />
      ) : null}
      {
        cities && !city ? (
          <CitiesOverview
            cities={Object.values(cities || {})}
          />
        ) : null
      }

      <LegendBar
        roadLegend={roadsLegend}
        road={params.roads}
        densityLegend={densityLegend}
        density={params.density}
        agebLegend={agebLegend}
        ageb={params.agebs}
        transportActive={params.transport.length === 1}
        geojson={geojson}
        legendTitle={legend.title}
        legendDictionary={legend.intervals}
        current={current}
      />
      <div id="map" className="w-screen h-screen" />
      <Loader loading={loading} />
      <CreditsCard />
      <div className=" hidden flex items-center justify-center animate-pulse rounded-full h-4 w-4 opacity-5  absolute rounded-full h-2 w-2" />
    </>
  );
}

Map.propTypes = {
  city: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  cities: PropTypes.objectOf(PropTypes.object).isRequired,
  onCityChange: PropTypes.func.isRequired,
};

export default Map;
