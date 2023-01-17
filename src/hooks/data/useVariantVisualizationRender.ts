import { useQuery } from '@tanstack/react-query';
import queries from 'src/utils/queries';
import { useMapParams } from 'src/context/mapParams';
import get from 'lodash/get';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import { generateVariantId, getFlattenFilters } from 'src/utils';
import getGridId from 'src/utils/getGridId';
import type { Feature, GeoJsonProperties, Polygon } from 'geojson';
import useCurrentVisualization from './useCurrentVisualization';
import useGrid from './useGrid';

function useVariantVisualizationRender({ onError }: { onError?: () => void }) {
  const getCurrentVisualization = useCurrentVisualization();
  const { add } = useMapboxLayerManager();
  const { data: grid, isLoading: isGridLoading } = useGrid();
  const { current, onFiltersChange } = useMapParams();
  const { cityCode, visualizationCode, variantCode } = current;
  const currentVisualization = getCurrentVisualization(current);
  const isIsochroneVisualization =
    currentVisualization?.relativeTo === 'feature' ?? false;

  useQuery({
    ...queries.visualizationVariants.detail({
      cityCode,
      visualizationCode,
      variantCode,
    }),
    enabled:
      !!cityCode &&
      !!visualizationCode &&
      !!variantCode &&
      !isGridLoading &&
      !isIsochroneVisualization,
    onError: (error) => {
      onError?.();
    },
    onSuccess: (data) => {
      const filters = currentVisualization?.filters ?? [];
      const filtersDepth = filters.length;
      const unitDict: Record<string, string> = {};
      filters.forEach((filter) => {
        filter.options.forEach((option) => {
          if (option.code && option.unit) {
            unitDict[option.code] = option.unit;
          }
        });
      });

      if (
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

      if (currentVisualization.comparable) {
        // Add `comparable` layers
        [...variants].reverse().forEach((variantFilters) => {
          const totalProperty = 'count';
          const unit =
            currentVisualization.unit?.shortName ??
            unitDict[Object.values(variantFilters)[0]]?.toLowerCase();

          const comparableFilter =
            currentVisualization.filters[
              currentVisualization.filters.length - 1
            ];
          const optionColor = comparableFilter.options.find((option) => {
            return variantFilters[comparableFilter.code] === option.code;
          })?.color;

          currentVisualization.customScales?.forEach((scale) => {
            let maxValue = 0;

            const features = Object.keys(data).reduce(
              (filtered, hexId, index) => {
                const total: number =
                  get(data[hexId], Object.values(variantFilters), {}) ?? 0;
                if (total > maxValue) {
                  maxValue = total;
                }

                // We filter features with no data
                if (total > 0 && total <= scale) {
                  filtered.push({
                    ...grid[hexId],
                    // Integer arbitrary identifier
                    id: index,
                    properties: {
                      ...grid[hexId].properties,
                      // Hexagon identifier
                      id: hexId,
                      [totalProperty]: total,
                      description: `${new Intl.NumberFormat().format(
                        total
                      )}  ${unit}`,
                    },
                  });
                }

                return filtered;
              },
              [] as Feature<Polygon, GeoJsonProperties>[]
            );

            const id = generateVariantId({
              ...current,
              filters: {
                ...variantFilters,
                scale: scale.toString(),
              },
            });

            add({
              legendTitle: currentVisualization.name,
              id,
              features,
              property: totalProperty,
              maxValue,
              visible: false,
              numberOfScales: currentVisualization?.scalesCount,
              customScales: currentVisualization?.customScales,
              customLegend: {
                title: comparableFilter?.name,
                scales: comparableFilter.options.map((option) => ({
                  color: option.color ?? '',
                  opacity: 1,
                  label: option.name,
                  topValue: 0,
                })),
              },
              scaleColors: [
                optionColor ?? currentVisualization.minColor,
                optionColor ?? currentVisualization.maxColor,
              ],
              unit,
              opacity: 1,
              beforeId: getGridId(cityCode, currentVisualization?.grid.code),
              solid: true,
            });
          });
        });
      } else {
        variants.forEach((variantFilters) => {
          const totalProperty = 'count';
          // TODO: Document this.
          const unit =
            currentVisualization?.unit?.shortName ??
            unitDict[Object.values(variantFilters)[0]]?.toLowerCase();

          let maxValue = 0;

          const features = Object.keys(data).reduce(
            (filtered, hexId, index) => {
              const total: number =
                get(data[hexId], Object.values(variantFilters), {}) ?? 0;

              if (total > maxValue) {
                maxValue = total;
              }

              // We filter feature with no data, so the map fits better.
              if (total > 0) {
                filtered.push({
                  ...grid[hexId],
                  // Integer arbitrary identifier
                  id: index,
                  properties: {
                    ...grid[hexId].properties,
                    // Hexagon identifier
                    id: hexId,
                    [totalProperty]: total,
                    description: `${new Intl.NumberFormat().format(
                      total
                    )} ${unit}`,
                  },
                });
              }

              return filtered;
            },
            [] as Feature<Polygon, GeoJsonProperties>[]
          );

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
            numberOfScales: currentVisualization?.scalesCount,
            customScales: currentVisualization?.customScales,
            scaleColors: [
              currentVisualization.minColor,
              currentVisualization.maxColor,
            ],
            unit,
            beforeId: getGridId(cityCode, currentVisualization?.grid.code),
          });
        });
      }

      // Render default variant with default filters
      const defaultVariantFilters: Record<string, string> = {};
      currentVisualization?.filters.forEach((filter) => {
        defaultVariantFilters[filter.code] = filter.defaultOption.code;
      });

      if (
        currentVisualization?.comparable &&
        currentVisualization.customScales?.[0]
      ) {
        defaultVariantFilters.scale =
          currentVisualization.customScales?.[0].toString();
      }

      onFiltersChange?.(defaultVariantFilters, 'reset');
    },
  });
}

export default useVariantVisualizationRender;
