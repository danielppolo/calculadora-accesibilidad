import { useMapParams } from 'src/context/mapParams';
import { useMap } from 'src/context/map';
import getGridId from 'src/utils/getGridId';
import { useEffect } from 'react';
import { MapMouseEvent } from 'src/types';
import useCurrentVariant from './useCurrentVariant';

let hoveredStateId: string | number | undefined;

function useGridListeners() {
  const getCurrentVariant = useCurrentVariant();
  const map = useMap();
  const { current, onHexagonChange } = useMapParams();
  const { cityCode, gridCode } = current;
  const currentVariant = getCurrentVariant(current);
  const isIsochroneVariant = currentVariant?.relative === 'hexagon' ?? false;

  useEffect(() => {
    const sourceId = getGridId(cityCode, gridCode);
    const handleHexagonClick = (event: MapMouseEvent) => {
      if (!isIsochroneVariant) {
        return;
      }

      const featureId = event.features?.[0]?.properties?.id;

      onHexagonChange?.(featureId);
    };

    const handleHexagonMouseEnter = (event: MapMouseEvent) => {
      if ((event?.features?.length ?? 0) > 0) {
        if (hoveredStateId) {
          map.setFeatureState(
            { source: sourceId, id: hoveredStateId },
            { hover: false }
          );
        }

        hoveredStateId = event?.features?.[0].id;

        if (hoveredStateId) {
          map.setFeatureState(
            { source: sourceId, id: hoveredStateId },
            { hover: true }
          );
        }
      }
    };

    const handleHexagonMouseLeave = () => {
      if (hoveredStateId) {
        map.setFeatureState(
          { source: sourceId, id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = undefined;
    };

    // When the user clicks a hexagon, we'll fetch the map relative to the feature.
    map
      .on('click', sourceId, handleHexagonClick)
      // When the user moves their mouse over the state-fill layer, we'll update the
      // feature state for the feature under the mouse.
      .on('mousemove', sourceId, handleHexagonMouseEnter)
      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      .on('mouseleave', sourceId, handleHexagonMouseLeave);

    return () => {
      map
        .off('click', sourceId, handleHexagonClick)
        .off('mousemove', sourceId, handleHexagonMouseEnter)
        .off('mouseleave', sourceId, handleHexagonMouseLeave);
    };
  }, [cityCode, gridCode, isIsochroneVariant, map, onHexagonChange]);
}

export default useGridListeners;
