import { useMapParams } from 'src/context/mapParams';
import { useMap } from 'src/context/map';
import getGridId from 'src/utils/getGridId';
import { useEffect } from 'react';
import { MapMouseEvent } from 'src/types';
import useCurrentVisualization from './useCurrentVisualization';

let hoveredStateId: string | number | undefined;
let selectedStateId: string | number | undefined;

function useGridListeners() {
  const getCurrentVisualization = useCurrentVisualization();
  const map = useMap();
  const { current, onFeatureChange } = useMapParams();
  const { cityCode, gridCode } = current;
  const currentVisualization = getCurrentVisualization(current);
  const isIsochroneVariant =
    currentVisualization?.relativeTo === 'feature' ?? false;

  useEffect(() => {
    const sourceId = getGridId(cityCode, gridCode);
    const handleHexagonClick = (event: MapMouseEvent) => {
      if (!isIsochroneVariant) {
        return;
      }

      if ((event?.features?.length ?? 0) > 0) {
        if (selectedStateId) {
          map.setFeatureState(
            { source: sourceId, id: selectedStateId },
            { selected: false }
          );
        }

        selectedStateId = event?.features?.[0].id;

        if (selectedStateId) {
          map.setFeatureState(
            { source: sourceId, id: selectedStateId },
            { selected: true }
          );
        }
      }

      const featureId = event.features?.[0]?.properties?.id;

      onFeatureChange?.(featureId);
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

    map
      // When the user clicks a feature, we'll fetch the map relative to the feature.
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
  }, [cityCode, gridCode, isIsochroneVariant, map, onFeatureChange]);
}

export default useGridListeners;
