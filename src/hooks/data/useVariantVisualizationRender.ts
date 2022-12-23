import { useQuery } from '@tanstack/react-query';
import queries from 'src/utils/queries';
import { useMapParams } from 'src/context/mapParams';
import get from 'lodash/get';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import { generateVariantId, getFlattenFilters } from 'src/utils';
import getGridId from 'src/utils/getGridId';
import type { Feature, GeoJsonProperties, Polygon } from 'geojson';
import useCurrentVisualization from './useCurrentVisualization';
import useCurrentVariant from './useCurrentVariant';
import useGrid from './useGrid';

function useVariantVisualizationRender({ onError }: { onError?: () => void }) {
  const getCurrentVisualization = useCurrentVisualization();
  const getCurrentVariant = useCurrentVariant();
  const { add } = useMapboxLayerManager();
  const { data: grid, isLoading: isGridLoading } = useGrid();
  const { current, onFiltersChange } = useMapParams();
  const { cityCode, visualizationCode, variantCode, featureId } = current;
  const currentVisualization = getCurrentVisualization(current);
  const currentVariant = getCurrentVariant(current);
  const isIsochroneVariant = currentVariant?.relative === 'hexagon' ?? false;

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
      !featureId &&
      !isIsochroneVariant,
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
        // TODO: Document this.
        const unit =
          currentVariant?.unit ??
          unitDict[Object.values(variantFilters)[0]]?.toLowerCase();

        let maxValue = 0;

        const features = Object.keys(data).reduce((filtered, hexId, index) => {
          const total =
            get(data[hexId], Object.values(variantFilters), {}) ?? 0;

          if (total > maxValue) {
            maxValue = total;
          }

          // We filter hexagons with no data, so the map fits better.
          if (total > 0) {
            filtered.push({
              ...grid[hexId],
              id: index,
              properties: {
                ...grid[hexId].properties,
                [totalProperty]: total,
                description: `${new Intl.NumberFormat().format(total)} ${unit}`,
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
          unit, // currentVariant?.unit
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

export default useVariantVisualizationRender;
