import { useQueryClient } from '@tanstack/react-query';
import queries from 'src/utils/queries';
import { useMapParams } from 'src/context/mapParams';
import { useMap } from 'src/context/map';
import getGridId from 'src/utils/getGridId';
import { useEffect } from 'react';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import { generateVariantId } from 'src/utils';
import useCurrentVariant from './useCurrentVariant';

type MapMouseEvent = mapboxgl.MapMouseEvent & {
  features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
} & mapboxgl.EventData;

function useGridClickListeners() {
  const getCurrentVariant = useCurrentVariant();
  const queryClient = useQueryClient();
  const map = useMap();
  const { show } = useMapboxLayerManager();
  const { current, onHexagonChange } = useMapParams();
  const { cityCode, gridCode, visualizationCode, variantCode } = current;
  const currentVariant = getCurrentVariant(current);
  const isIsochroneVariant = currentVariant?.type === 'isochrone' ?? false;

  useEffect(() => {
    const handleHexagonClick = (event: MapMouseEvent) => {
      if (!isIsochroneVariant) {
        return;
      }

      const featureId = event.features?.[0]?.properties?.id;
      const { queryKey } = queries.visualizationVariants.hexagon({
        cityCode,
        visualizationCode,
        variantCode,
        featureId,
      });
      const isDataCached = queryClient.getQueryCache().find(queryKey);

      if (isDataCached) {
        // Show the cached data
        const id = generateVariantId({
          ...current,
          featureId,
        });
        show(id);
      } else {
        // Fetch for the first time
        onHexagonChange?.(featureId);
      }
    };

    map.on('click', getGridId(cityCode, gridCode), handleHexagonClick);

    return () => {
      map.off('click', getGridId(cityCode, gridCode), handleHexagonClick);
    };
  }, [
    cityCode,
    current,
    gridCode,
    isIsochroneVariant,
    map,
    onHexagonChange,
    queryClient,
    show,
    variantCode,
    visualizationCode,
  ]);
}

export default useGridClickListeners;
