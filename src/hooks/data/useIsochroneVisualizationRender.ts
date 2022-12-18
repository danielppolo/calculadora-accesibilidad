import { useQuery } from '@tanstack/react-query';
import queries from 'src/utils/queries';
import { useMapParams } from 'src/context/mapParams';
import get from 'lodash/get';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import { generateVariantId, getFlattenFilters } from 'src/utils';
import getGridId from 'src/utils/getGridId';
import type { Feature, GeoJsonProperties, Polygon } from 'geojson';

import useGrid from './useGrid';
import useCurrentVisualization from './useCurrentVisualization';
import useCurrentVariant from './useCurrentVariant';

function useIsochroneVisualizationRender({
  onError,
}: {
  onError?: () => void;
}) {
  const getCurrentVisualization = useCurrentVisualization();
  const getCurrentVariant = useCurrentVariant();
  const { current, onFiltersChange } = useMapParams();
  const { add } = useMapboxLayerManager();
  const { data: grid, isLoading: isGridLoading } = useGrid();
  const { cityCode, visualizationCode, variantCode, featureId } = current;
  const currentVisualization = getCurrentVisualization(current);
  const currentVariant = getCurrentVariant(current);
  const isIsochroneVariant = currentVariant?.relative === 'hexagon' ?? false;

  useQuery({
    ...queries.visualizationVariants.hexagon({
      cityCode,
      visualizationCode,
      variantCode,
      featureId,
    }),
    enabled:
      !!cityCode &&
      !!featureId &&
      !!visualizationCode &&
      !!variantCode &&
      !isGridLoading &&
      isIsochroneVariant,
    onError: (error) => {
      onError?.();
    },
    onSuccess: (data) => {
      const filters = currentVisualization?.filters ?? [];
      const filtersDepth = filters.length;
      const unitDict: Record<string, string> = {};
      filters.forEach((filter) => {
        filter.properties.forEach((property) => {
          if (property.code && property.unit) {
            unitDict[property.code] = property.unit;
          }
        });
      });

      if (
        !featureId ||
        !filtersDepth ||
        !grid ||
        !cityCode ||
        !visualizationCode ||
        !variantCode ||
        !currentVisualization?.grid.code
      ) {
        console.warn(
          "Couldn't render visualization because of missing depenedencies"
        );
        return;
      }

      const variants = getFlattenFilters(filters);

      variants.forEach((variantFilters) => {
        const totalProperty = 'count';
        const unit =
          currentVariant?.unit ??
          unitDict[Object.values(variantFilters)[0]]?.toLowerCase();

        let maxValue = 0;

        const features = Object.keys(data).reduce((filtered, hexId) => {
          const isClickedHexagon = hexId === featureId;
          let total = get(data[hexId], Object.values(variantFilters), {}) ?? 0;

          if (total > maxValue) {
            maxValue = total;
          }

          if (isClickedHexagon) {
            total = total || 1;
          }

          // We filter hexagons with no data
          if (total > 0 || isClickedHexagon) {
            filtered.push({
              ...grid[hexId],
              properties: {
                ...grid[hexId].properties,
                [totalProperty]: total,
                description: `${new Intl.NumberFormat().format(
                  total
                )}  ${unit}`,
              },
            });
          }

          return filtered;
        }, [] as Feature<Polygon, GeoJsonProperties>[]);

        const id = generateVariantId({
          ...current,
          filters: variantFilters,
        });

        add({
          legendTitle: currentVisualization.name,
          id,
          features,
          property: totalProperty,
          maxValue,
          visible: false,
          stepSize: currentVisualization?.ranges?.length,
          colors: [
            currentVisualization.minColor,
            currentVisualization.maxColor,
          ],
          unit,
          beforeId: getGridId(cityCode, currentVisualization?.grid.code),
        });
      });

      // Render default variant with default filters
      const defaultVariantFilters: Record<string, string> = {};
      currentVisualization?.filters.forEach((filter) => {
        defaultVariantFilters[filter.code] = filter.defaultProperty.code;
      });

      onFiltersChange?.(defaultVariantFilters, 'reset');
    },
  });
}

export default useIsochroneVisualizationRender;

// const incomingChartData: CustomChartData = {};

// TODO: Create mapbox layers for all the different filter combinations.
// [...TIMEFRAMES].reverse().forEach((step) => {
// TODO: Calculate data.
// const featureIds = Object.keys(json);
// const transportReach = TRANSPORTS.map((transport, index) => {
//   const filteredIds = featureIds.filter(
//     (id) =>
//       json[id][index] &&
//       calculateTime(json[id][index], transport) <= step &&
//       grid[id]
//   );
//   const filteredFeatures = filteredIds.map((id) => ({
//     ...grid[id],
//     properties: {
//       ...grid[id].properties,
//       [transport]: calculateTime(json[id][index], transport),
//       description: `${calculateTime(
//         json[id][index],
//         transport
//       )} minutos`,
//     },
//   }));
//   // Include clicked feature.
//   filteredFeatures.push({
//     ...grid[featureId],
//     properties: {
//       ...grid[featureId].properties,
//       [transport]: 1,
//       selected: true,
//       description: '15 minutos',
//     },
//   });
//   return [transport, filteredFeatures] as const;
// });

// const sortedTransports = transportReach.sort(
//   (a, b) => b[1].length - a[1].length
// );

// TODO: Add layers
// sortedTransports.forEach(([transport, transportFeatures]) => {
//   if (cityCode && gridCode) {
//     add({
//       legendTitle: 'Tiempo de traslado',
//       unit: 'min',
//       id: getHexagonId(featureId, transport, step),
//       features: transportFeatures,
//       property: transport,
//       maxValue: step,
//       visible: false,
//       beforeId: getGridId(cityCode, gridCode),
//       stepSize: Math.floor(step / 15),
//       reverseColors: true,
//       colors: COLORS[TRANSPORT_COLORS[transport]],
//     });
//     add({
//       legendTitle: 'Tiempo de traslado',
//       unit: 'min',
//       id: getHexagonId(featureId, transport, step, {
//         solid: true,
//       }),
//       features: transportFeatures,
//       property: transport,
//       maxValue: step,
//       solid: true,
//       opacity: 1,
//       visible: false,
//       beforeId: getGridId(cityCode, gridCode),
//       stepSize: Math.floor(step / 15),
//       reverseColors: true,
//       colors:
//         COLORS[
//           TRANSPORT_COLORS[transport as keyof typeof TRANSPORT_COLORS]
//         ],
//     });

// TODO: Register mouseleave event.
// map.on(
//   'mousemove',
//   getHexagonId(featureId, transport, step),
//   (e) => {
//     popup
//       .setLngLat(event.lngLat)
//       .setHTML(event.features?.[0]?.properties?.description)
//       .addTo(map);
//   }
// );

// TODO: Register mouseleave event.
// map.on(
//   'mouseleave',
//   getHexagonId(featureId, transport, step),
//   () => {
//     popup.remove();
//   }
// );

// TODO: Get chart data
// if (!(step in incomingChartData)) {
//   incomingChartData[step] = {};
// }
// incomingChartData[step][transport] = {
//   facilities: {
//     Empresas: count(transportFeatures, 'empress'),
//     Clínicas: count(transportFeatures, 'clinics'),
//     Escuelas: count(transportFeatures, 'escuels'),
//   },
//   opportunities: {
//     'Personal ocupado': count(transportFeatures, 'jobs_w'),
//   },
// };
// }
// });
// });
