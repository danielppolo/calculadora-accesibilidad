import { useQuery } from '@tanstack/react-query';
import queries from 'src/utils/queries';
import { useMapParams } from 'src/context/mapParams';

import useGrid from './useGrid';
import useCurrentVisualization from './useCurrentVisualization';
import useRenderVisualization from '../useRenderVisualization';

function useIsochroneVisualizationRender({
  onError,
}: {
  onError?: () => void;
}) {
  const getCurrentVisualization = useCurrentVisualization();
  const { current } = useMapParams();
  const { data: grid, isLoading: isGridLoading } = useGrid();
  const { cityCode, visualizationCode, variantCode, featureId } = current;
  const currentVisualization = getCurrentVisualization(current);
  const isIsochroneVisualization =
    currentVisualization?.relativeTo === 'feature' ?? false;
  const renderVisualization = useRenderVisualization();

  useQuery({
    ...queries.visualizationVariants.feature({
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
      isIsochroneVisualization,
    onError: (error) => {
      onError?.();
    },
    onSuccess: (data) => {
      const filters = currentVisualization?.filters ?? [];

      if (
        !featureId ||
        !filters.length ||
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
        featureId,
        current,
        cityCode,
      });
    },
  });
}

export default useIsochroneVisualizationRender;
