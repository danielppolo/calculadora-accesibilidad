import { useQuery } from '@tanstack/react-query';
import queries from 'src/utils/queries';
import { useMapParams } from 'src/context/mapParams';
import useCurrentVisualization from './useCurrentVisualization';
import useGrid from './useGrid';
import useRenderVisualization from '../useRenderVisualization';

function useVariantVisualizationRender({ onError }: { onError?: () => void }) {
  const getCurrentVisualization = useCurrentVisualization();
  const { data: grid, isLoading: isGridLoading } = useGrid();
  const { current } = useMapParams();
  const { cityCode, visualizationCode, variantCode } = current;
  const currentVisualization = getCurrentVisualization(current);
  const isIsochroneVisualization =
    currentVisualization?.relativeTo === 'feature' ?? false;
  const renderVisualization = useRenderVisualization();

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

      renderVisualization({
        data,
        grid,
        currentVisualization,
        current,
        cityCode,
      });
    },
  });
}

export default useVariantVisualizationRender;
