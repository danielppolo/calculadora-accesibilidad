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
} from '../constants';
import useLayerManager from '../hooks/useLayerManager';
import Loader from './Loader';
import LegendBar from './LegendBar';
import useBaseGrid from '../hooks/useBaseGrid';
import useFitMap from '../hooks/useFitMap';
import useCityData from '../hooks/useCityData';
import useEconomicZones from '../hooks/useEconomicZones';
import useMap from '../hooks/useMap';
import ControlsCard from './ControlsCard';
import useMarginalizationLayers from '../hooks/useMarginalizationLayers';
import MapControls from './MapControls';
import CitiesOverview from './CitiesOverview';
import displayCityMarkers from '../utils/displayCityMarkers';
import getHexagonId from '../utils/getHexagonId';
import count from '../utils/countFeatures';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;

const cityGridId = (cityId) => `${cityId}-grid`;
const cityOpportunityId = (opportunity, city) => `${opportunity}-${city}`;
const defaultOpportunity = Object.keys(OPPORTUNITIES)[0];
const defaultTransport = TRANSPORTS[0];
const defaultTimeframe = TIMEFRAMES[1];
const defaultParams = {
  hexagon: undefined,
  transport: [defaultTransport],
  timeframe: defaultTimeframe,
  opportunity: undefined,
  agebs: false,
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
  const [cityMarkers, setCityMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState(defaultParams);
  const [chartData, setChartData] = useState({});
  const { load: loadBaseGrid, state: gridState } = useBaseGrid();
  const {
    load: loadAgebs, show: showAgebs, hide: hideAgebs, legend: agebLegend,
  } = useMarginalizationLayers();
  const getCurrentTimeframe = () => currentTimeframe;
  const getCurrentTransport = () => currentTransport;
  const handleCityChange = useCallback(
    (cty) => {
      map.flyTo({
        center: cities[cty].coordinates,
        zoom: 11,
        duration: 2000,
        offset: [100, 50],
      });
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
  }

  useEffect(() => {
    if (city && cityMarkers.length > 0) {
      cityMarkers.forEach((marker) => marker.remove());
      setCityMarkers([]);
    } else if (map && cities && !city && !cityMarkers.length) {
      setCityMarkers(displayCityMarkers(map, cities, { onClick: handleCityChange }));
    }
  }, [map, cities, city, cityMarkers, onCityChange, handleCityChange]);

  useEffect(() => {
    if (map && mapLoaded && features.length > 0) {
      loadBaseGrid(map, features, cityGridId(city));
      loadAgebs(map) 
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
            stepSize: 10,
            beforeId: cityGridId(city),
          });
        }
      });
    
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
          console.log(incomingChartData);
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
  }, [map, mapLoaded, features]);

  const handleScenarioChange = (sce) => {
    setScenario(sce);
    router.query = {
      ...router.query,
      scenario: sce,
    };
    router.replace(router);
  };

  const handleOpportunityChange = (nextOpportunity) => {
    hideAll(map);
    hideAgebs(map);
    show(map, cityOpportunityId(nextOpportunity, city));
    setParams({
      ...params,
      opportunity: nextOpportunity,
      hexagon: undefined,
      agebs: false,
    });
    router.query = {
      ...router.query,
      opportunity: nextOpportunity,
      featureId: undefined,
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

  const handleTimeframeChange = (value) => {
    if (params.hexagon.id) {
      hideAll(map);
      if (params.transport.length === 1) {
        show(map, getHexagonId(params.hexagon.id, params.transport[0], value));
      } else if (params.transport.length > 1) {
        params.transport.forEach((transport) => {
          show(map, getHexagonId(params.hexagon.id, transport, value, { solid: true }));
        });
      }
    }
    setParams({
      ...params,
      timeframe: value,
    });
    currentTimeframe = value;
    router.query = {
      ...router.query,
      timeframe: value,
    };
    router.replace(router);
  };

  const handleTransportChange = (value) => {
    if (params.hexagon.id && value) {
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
    }
  };

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
      {
        params.transport.length === 1 && (
          <LegendBar
            agebLegend={agebLegend}
            ageb={params.agebs}
            geojson={geojson}
            legendTitle={legend.title}
            legendDictionary={legend.intervals}
            current={current}
          />
        )
      }
      <div id="map" className="w-screen h-screen" />
      <Loader loading={loading} />
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
