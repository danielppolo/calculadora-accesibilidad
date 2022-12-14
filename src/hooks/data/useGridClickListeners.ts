import { useMapParams } from 'src/context/mapParams';
import { useMap } from 'src/context/map';
import getGridId from 'src/utils/getGridId';
import { useEffect } from 'react';
import useCurrentVariant from './useCurrentVariant';

type MapMouseEvent = mapboxgl.MapMouseEvent & {
  features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
} & mapboxgl.EventData;

function useGridClickListeners() {
  const getCurrentVariant = useCurrentVariant();
  const map = useMap();
  const { current, onHexagonChange } = useMapParams();
  const { cityCode, gridCode } = current;
  const currentVariant = getCurrentVariant(current);
  const isIsochroneVariant = currentVariant?.type === 'isochrone' ?? false;

  useEffect(() => {
    const handleHexagonClick = (event: MapMouseEvent) => {
      if (!isIsochroneVariant) {
        return;
      }

      const featureId = event.features?.[0]?.properties?.id;

      onHexagonChange?.(featureId);
    };

    map.on('click', getGridId(cityCode, gridCode), handleHexagonClick);

    return () => {
      map.off('click', getGridId(cityCode, gridCode), handleHexagonClick);
    };
  }, [cityCode, gridCode, isIsochroneVariant, map, onHexagonChange]);
}

export default useGridClickListeners;
