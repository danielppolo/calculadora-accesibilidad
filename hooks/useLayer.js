import { useCallback } from 'react';

const useLayer = (layerList, title = '') => {
  const load = useCallback((map) => {
    layerList.forEach((layer) => {
      map.addSource(layer.id, {
        type: 'vector',
        url: layer.url,
        minzoom: 6,
        maxzoom: 14,
      });
      map.addLayer({
        id: layer.id,
        type: layer.type,
        source: layer.id,
        layout: {
          visibility: 'none',
        },
        'source-layer': layer.sourceLayer,
        paint: layer.paint,
      });
    });
  }, [layerList]);

  const show = useCallback((map) => {
    layerList.forEach((layer) => {
      map.setLayoutProperty(layer.id, 'visibility', 'visible');
    });
  }, [layerList]);

  const hide = useCallback((map) => {
    layerList.forEach((layer) => {
      map.setLayoutProperty(layer.id, 'visibility', 'none');
    });
  }, [layerList]);

  const legend = {
    title,
    intervals: layerList.map((layer) => ({
      color: layer.color,
      label: layer.label,
    })),
  };

  return {
    load,
    show,
    hide,
    legend,
  };
};

export default useLayer;
