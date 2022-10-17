import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import { Popup } from 'mapbox-gl';
import {
  MEXICO_COORDINATES,
  TRANSPORTS,
  OPPORTUNITIES,
  TIMEFRAMES,
  TRANSPORT_COLORS,
  COLORS,
  TRANSPORT_TRANSLATIONS,
  OPPORTUNITY_TIMEFRAMES,
} from 'src/constants';
import useLayerManager from 'src/hooks/useLayerManager';
import LegendBar from 'src/components/LegendBar';
import useBaseGrid from 'src/hooks/useBaseGrid';
import useMapFit from 'src/hooks/useMapFit';
import useCityData from 'src/hooks/useCityData';
import ControlsCard from 'src/components/ControlsCard';
import useMarginalizationLayers from 'src/hooks/useMarginalizationLayers';
import MapControls from 'src/components/MapControls';
import CitiesOverview from 'src/components/CitiesOverview';
import getHexagonId from 'src/utils/getHexagonId';
import calculateTime, { calculateTimeForOpp } from 'src/utils/calculateTime';
import getOpportunityId from 'src/utils/getOpportunityId';
import count from 'src/utils/countFeatures';
import CreditsCard from 'src/components/CreditsCard';
import useCityMarkers from 'src/hooks/useCityMarkers';
import usePopulationDensity from 'src/hooks/usePopulationDensity';
import useNationalRoadNetwork from 'src/hooks/useNationalRoadNetwork';
import {
  City, Code, Config, FeatureDictionary,
} from 'src/types';
import { getGridId } from 'src/utils/getLayerIds';
import useMap from 'src/hooks/useMap';
import { getVisualizationForFeature } from 'src/utils/api';

type Params = {
  visualization?: string;
  opportunity?: string;
  hexagon?: {
    id: string;
  };
  transport: string[];
  timeframe?: number;
  agebs: boolean;
  density: boolean;
  roads: boolean;
}

type Current = {
  cityCode?: string,
  gridCode?: string,
  visualizationCode?: string,
  variantCode?: string,
}

type MapData = Record<City['code'], {
  grids: Record<Code, FeatureDictionary>,
  visualizations: Record<Code, Record<string, Record<Code, any>>>,
}>;

interface MapLayerProps {
  current?: Current;
  mapData?: MapData;
  config?: Config;
  onVisualizationChange: (cityCode: string, visualizationCode: string) => void;
  onCityChange?: (cityCode?: string) => void;
  onVariantChange?: (cityCode: string, visualizationCode: string, variantCode: string) => void;
  onLoading?: (loading: boolean) => void;
}

type CustomChartData = Record<number, Record<string, {
  facilities: Record<string, number>;
  opportunities: Record<string, number>;
}>>

const cityOpportunityId = (opportunity: string, city: string) => `${city}-${opportunity}`;

const defaultOpportunity = Object.keys(OPPORTUNITIES)[0];

const defaultTransport = TRANSPORTS[0];

const defaultTimeFrame = 30;

const defaultParams: Params = {
  visualization: undefined,
  opportunity: undefined,
  hexagon: undefined,
  transport: [],
  timeframe: undefined,
  agebs: false,
  density: false,
  roads: false,
};

const popup = new Popup({
  className: 'black-popup',
  closeButton: false,
  closeOnClick: false,
});

let currentTimeFrame = defaultTimeFrame;
let currentTransport: string[] = [defaultTransport];

function MapLayer({
  config = {},
  current = {},
  mapData = {},
  onCityChange,
  onVisualizationChange,
  onVariantChange,
  onLoading,
}: MapLayerProps) {
  const grid = useMemo(() => (current.cityCode && current.gridCode
    ? mapData[current.cityCode].grids[current.gridCode] : {}),
  [current.cityCode, current.gridCode, mapData]);
  const city = current.cityCode;
  const features = useMemo(() => (grid ? Object.values(grid) : []), [grid]);

  useBaseGrid({
    features,
    cityCode: current?.cityCode,
    gridCode: current?.gridCode,
    popup,
  });
  const map = useMap();
  const {
    state,
    legend,
    add,
    show,
    hideAll,
    geojson,
  } = useLayerManager();
  useMapFit(geojson?.features);

  const { metadata: cityData } = useCityData(grid);
  const [params, setParams] = useState({ ...defaultParams });
  const [chartData, setChartData] = useState<CustomChartData>({});
  const {
    show: showAgebs, hide: hideAgebs, legend: agebLegend,
  } = useMarginalizationLayers();
  const {
    show: showDensity, hide: hideDensity, legend: densityLegend,
  } = usePopulationDensity();
  const {
    show: showRoads, hide: hideRoads, legend: roadsLegend,
  } = useNationalRoadNetwork();
  const getCurrentTimeFrame = () => currentTimeFrame;
  const getCurrentTransport = () => currentTransport;

  const handleOpportunityChange = useCallback((nextOpportunity) => {
    if (city) {
      hideAll();
      hideAgebs();
      show(cityOpportunityId(nextOpportunity, city));
      setParams({
        ...params,
        opportunity: nextOpportunity,
        hexagon: undefined,
        agebs: false,
        timeframe: undefined,
        transport: [],
      });
    }
  }, [city, hideAgebs, hideAll, params, show]);

  const resetParams = () => {
    setParams({ ...defaultParams });
    currentTimeFrame = defaultTimeFrame;
    currentTransport = [defaultTransport];
  };

  const handleCityChange = useCallback(
    (nextCity: string) => {
      map.flyTo({
        center: config?.[nextCity]?.coordinates,
        zoom: 11,
        duration: 2000,
        offset: [100, 50],
      });

      hideAll();
      onCityChange?.(nextCity);
      resetParams();
    },
    [config, hideAll, map, onCityChange],
  );

  useCityMarkers({
    hide: !!current.cityCode,
    config,
    onClick: handleCityChange,
  });

  const resetMap = () => {
    map.flyTo({
      center: MEXICO_COORDINATES,
      zoom: 4.5,
      duration: 2000,
    });
    hideAll();
    onCityChange?.(undefined);
    resetParams();
  };

  useEffect(() => {
    if (city && features.length) {
      // Load opportunities
      Object.keys(OPPORTUNITIES).forEach((opp) => {
        let maxValue = 0;
        const filteredFeatures = features.filter((item) => {
          const value = item.properties?.[opp] ?? 0;
          if (value > maxValue) {
            maxValue = value;
          }
          return value > 0;
        });
        if (!(opp in state) && current.gridCode) {
          const oppLabel = OPPORTUNITIES[opp as keyof typeof OPPORTUNITIES].toLowerCase();
          add({
            legendTitle: `Número de ${oppLabel}`,
            id: cityOpportunityId(opp, city),
            features: filteredFeatures,
            property: opp,
            maxValue,
            visible: false,
            stepSize: 6,
            colors: ['#7054BC', '#F1BB43'],
            beforeId: getGridId(city, current.gridCode),
          });
        }
      });

      // Load static map
      Object.keys(OPPORTUNITIES).forEach((opp) => {
        TRANSPORTS.forEach((tra) => {
          OPPORTUNITY_TIMEFRAMES.forEach((tm) => {
            const key = getOpportunityId(opp, tra, tm);

            let maxValue = 0;
            const filteredFeatures = features.map((item) => ({
              ...item,
              properties: {
                ...item.properties,
                [key]: calculateTimeForOpp(item?.properties?.[key], tra),
              },
            })).filter((item) => {
              if (item.properties[key] > maxValue) {
                maxValue = item.properties[key];
              }
              return item.properties[key] > 0;
            });

            if (!(key in state) && city && current.gridCode) {
              add({
                legendTitle: `Número de ${OPPORTUNITIES[opp as keyof typeof OPPORTUNITIES].toLowerCase()} alcanzables`,
                id: cityOpportunityId(key, city),
                features: filteredFeatures,
                property: key,
                maxValue,
                visible: false,
                stepSize: 6,
                colors: ['#7054BC', '#F1BB43'],
                beforeId: getGridId(city, current.gridCode),
              });
            }
          });
        });
      });

      // Display default opportunity on city change.
      // show(map, cityOpportunityId(defaultOpportunity, city));
      setParams({
        ...params,
        opportunity: defaultOpportunity,
      });
    }
  }, [features]);

  useEffect(() => {
    if (features.length > 0
      && params.visualization === 'isochrones'
      && current.cityCode
      && current.gridCode) {
      // Hexagon click listener
      map.on('click', getGridId(current.cityCode, current.gridCode), async (event) => {
        if (
          current.visualizationCode
          && current.cityCode
          && current.variantCode
        ) {
          onLoading?.(true);
          const feature = event.features?.[0]?.properties;
          const featureId = event.features?.[0]?.properties?.h3_ddrs;
          const response = await getVisualizationForFeature(
            current.cityCode,
            current.visualizationCode,
            current.variantCode,
            featureId,
          );
          const text = await response.text();
          const json = JSON.parse(text);
          const incomingChartData: CustomChartData = {};
          // Create 9 isochrones variant layers
          [...TIMEFRAMES].reverse().forEach((step) => {
            const featureIds = Object.keys(json);
            const transportReach = TRANSPORTS.map((transport, index) => {
              const filteredIds = featureIds
                .filter(
                  (id) => json[id][index]
                       && (calculateTime(json[id][index], transport) <= step)
                       && grid[id],
                );
              const filteredFeatures = filteredIds.map((id) => ({
                ...grid[id],
                properties: {
                  ...grid[id].properties,
                  [transport]: calculateTime(json[id][index], transport),
                  description: `${calculateTime(json[id][index], transport)} minutos`,
                },
              }));
              // Include clicked feature.
              filteredFeatures.push({
                ...grid[featureId],
                properties: {
                  ...grid[featureId].properties,
                  [transport]: 1,
                  selected: true,
                  description: '15 minutos',
                },
              });
              return [transport, filteredFeatures] as const;
            });
            const sortedTransports = transportReach.sort((a, b) => b[1].length - a[1].length);
            sortedTransports.forEach(([transport, transportFeatures]) => {
              if (current.cityCode && current.gridCode) {
                add({
                  legendTitle: 'Tiempo de traslado',
                  unit: 'min',
                  id: getHexagonId(featureId, transport, step),
                  features: transportFeatures,
                  property: transport,
                  maxValue: step,
                  visible: false,
                  beforeId: getGridId(current.cityCode, current.gridCode),
                  stepSize: Math.floor(step / 15),
                  reverseColors: true,
                  colors: COLORS[TRANSPORT_COLORS[transport]],
                });
                add({
                  legendTitle: 'Tiempo de traslado',
                  unit: 'min',
                  id: getHexagonId(featureId, transport, step, { solid: true }),
                  features: transportFeatures,
                  property: transport,
                  maxValue: step,
                  solid: true,
                  opacity: 1,
                  visible: false,
                  beforeId: getGridId(current.cityCode, current.gridCode),
                  stepSize: Math.floor(step / 15),
                  reverseColors: true,
                  colors: COLORS[TRANSPORT_COLORS[transport as keyof typeof TRANSPORT_COLORS]],
                });
                map.on('mousemove', getHexagonId(featureId, transport, step), (e) => {
                  popup
                    .setLngLat(event.lngLat)
                    .setHTML(event.features?.[0]?.properties?.description)
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
                    Empresas: count(transportFeatures, 'empress'),
                    Clínicas: count(transportFeatures, 'clinics'),
                    Escuelas: count(transportFeatures, 'escuels'),
                  },
                  opportunities: {
                    'Personal ocupado': count(transportFeatures, 'jobs_w'),
                  },
                };
              }
            });
          });
          setChartData(incomingChartData);
          onLoading?.(false);
          hideAll();
          getCurrentTransport().forEach((transport) => {
            show(getHexagonId(featureId, transport, getCurrentTimeFrame()));
          });
          setParams({
            ...params,
            timeframe: getCurrentTimeFrame(),
            transport: getCurrentTransport(),
            opportunity: undefined,
            hexagon: {
              id: featureId,
              ...feature,
            },
          });
        }
      });
    }
  }, [
    map,
    features,
    params.visualization,
    current.cityCode,
    params,
    current.visualizationCode,
    current.variantCode,
    current.gridCode,
    onLoading,
    hideAll,
    grid,
    add,
    show,
  ]);

  const handleVariantChange = (variantCode: string) => {
    if (current.cityCode && current.visualizationCode) {
      onVariantChange?.(current.cityCode, current.visualizationCode, variantCode);
    }
  };

  const handleEconomicChange = () => {
    if (params.agebs) {
      hideAgebs();
      setParams({
        ...params,
        agebs: false,
      });
    } else {
      hideDensity();
      hideRoads();
      showAgebs();
      setParams({
        ...params,
        agebs: true,
        density: false,
        roads: false,
      });
    }
  };

  const handleDensityChange = () => {
    if (params.density) {
      hideDensity();
      setParams({
        ...params,
        density: false,
      });
    } else {
      hideAgebs();
      hideRoads();
      showDensity();
      setParams({
        ...params,
        density: true,
        agebs: false,
        roads: false,
      });
    }
  };

  const handleRoadChange = () => {
    if (params.roads) {
      hideRoads();
      setParams({
        ...params,
        roads: false,
      });
    } else {
      hideAgebs();
      hideDensity();
      showRoads();
      setParams({
        ...params,
        density: false,
        agebs: false,
        roads: true,
      });
    }
  };

  const handleTimeframeChange = (value: number) => {
    if (params.hexagon && params.hexagon.id) {
      hideAll();
      if (params.transport.length === 1) {
        show(getHexagonId(params.hexagon.id, params.transport[0], value));
      } else if (params.transport.length > 1) {
        params.transport.forEach((transport) => {
          show(getHexagonId(params?.hexagon?.id, transport, value, { solid: true }));
        });
      }
    } else if (value) {
      hideAll();
      if (params.opportunity && city) {
        show(
          cityOpportunityId(
            getOpportunityId(params.opportunity, params.transport[0] || defaultTransport, value),
            city,
          ),
        );
      }
    }

    setParams({
      ...params,
      timeframe: value,
      transport: params.transport[0] ? params.transport : [defaultTransport],
    });
    currentTimeFrame = value;
  };

  const handleTransportChange = (value: string) => {
    if (params.hexagon && params.hexagon.id && value) {
      hideAll();
      let newTransportSelection;
      if (params.transport.includes(value)) {
        newTransportSelection = [...params.transport].filter((item) => item !== value);
      } else {
        newTransportSelection = [...params.transport, value];
      }
      if (newTransportSelection.length === 1) {
        show(getHexagonId(params.hexagon.id, newTransportSelection[0], params.timeframe));
      } else if (newTransportSelection.length > 1) {
        newTransportSelection.forEach((transport) => {
          show(
            getHexagonId(params?.hexagon?.id, transport, params.timeframe, { solid: true }),
          );
        });
      }
      setParams({
        ...params,
        transport: newTransportSelection,
      });
      currentTransport = newTransportSelection;
    } else if (value) {
      hideAll();
      if (params.opportunity && city) {
        show(
          cityOpportunityId(
            getOpportunityId(
              params.opportunity,
              value,
              (params.timeframe || defaultTimeFrame),
            ),
            city,
          ),
        );
      }
      setParams({
        ...params,
        transport: [value],
        timeframe: params.timeframe || defaultTimeFrame,
      });
      currentTransport = [value];
    }
  };

  const handleVisualizationChange = (visualizationCode: string) => {
    hideAll();
    if (visualizationCode === 'opportunities') {
      if (city) {
        show(cityOpportunityId(defaultOpportunity, city));
      }
      setParams({
        ...defaultParams,
        opportunity: defaultOpportunity,
        visualization: visualizationCode,
      });
    } else if (visualizationCode === 'reachability') {
      if (city) {
        show(
          cityOpportunityId(
            getOpportunityId(defaultOpportunity, defaultTransport, defaultTimeFrame),
            city,
          ),
        );
      }
      setParams({
        ...defaultParams,
        opportunity: defaultOpportunity,
        transport: [defaultTransport],
        timeframe: defaultTimeFrame,
        visualization: visualizationCode,
      });
    } else {
      setParams({
        ...defaultParams,
        visualization: visualizationCode,
      });
    }

    if (current.cityCode) {
      onVisualizationChange?.(current.cityCode, visualizationCode);
    }
  };

  const buildChartDataset = useCallback((key: 'facilities' | 'opportunities') => {
    if (params.hexagon && typeof params.timeframe !== 'undefined') {
      const timeData = chartData[params.timeframe];
      return {
        labels: Object.keys(timeData[TRANSPORTS[0]][key]),
        datasets: Object.keys(timeData).map((transport) => ({
          label: TRANSPORT_TRANSLATIONS[transport as keyof typeof TRANSPORT_TRANSLATIONS],
          data: Object.keys(timeData[transport][key])
            .map((prop: string) => {
              const value = timeData[transport][key][prop] ?? 0;
              const total = cityData[prop as keyof typeof cityData] ?? 0;
              return (value / total) * 100;
            }),
          backgroundColor: COLORS[TRANSPORT_COLORS[transport as keyof typeof TRANSPORT_COLORS]][0],
        })),
      };
    }

    return undefined;
  }, [params.hexagon, params.timeframe, chartData, cityData]);

  const opportunitiesChartData = useMemo(() => buildChartDataset('opportunities'), [buildChartDataset]);
  const facilitiesChartData = useMemo(() => buildChartDataset('facilities'), [buildChartDataset]);

  return (
    <>
      <MapControls
        cityCode={current.cityCode}
        visualizationCode={current.visualizationCode}
        variantCode={current.variantCode}
        onVariantChange={handleVariantChange}
        onVisualizationChange={handleVisualizationChange}
        onCityChange={handleCityChange}
        //
        transport={params.transport}
        timeframe={params.timeframe}
        hexagonDisabled={!params.hexagon}
        opportunity={params.opportunity}
        city={(!!config && !!city) ? config[city] : undefined}
        cities={Object.values(config || {})}
        economicLayer={params.agebs}
        densityLayer={params.density}
        roadsLayer={params.roads}
        visualization={params.visualization}
        resetMap={resetMap}
        onRoadsLayerChange={handleRoadChange}
        onOpportunityChange={handleOpportunityChange}
        onMediumChange={handleTransportChange}
        onTimeStepChange={handleTimeframeChange}
        onEconomicLayerChange={handleEconomicChange}
        onDensityLayerChange={handleDensityChange}
      />
      {city ? (
        <ControlsCard
          title={config?.[city].name}
          cityData={cityData}
          reachableOpportunities={opportunitiesChartData}
          reachableFacilities={facilitiesChartData}
        />
      ) : null}
      {
        config && !city ? (
          <CitiesOverview
            cities={Object.values(config || {})}
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
        city={city}
      />
      <CreditsCard />
      <div className="hidden flex items-center justify-center animate-pulse rounded-full h-4 w-4 opacity-5  absolute rounded-full h-2 w-2" />
    </>
  );
}

export default MapLayer;
