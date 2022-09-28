import { Map } from 'mapbox-gl';
import React, { useCallback } from 'react';

const layer = {
  id: 'red-vial',
  sourceLayer: 'red_vial-bsfw1p',
  url: 'mapbox://daniel-itdp.0a0m3fxb',
  color: '#ff0000',
  label: 'Red vial',
}

const useNationalRoadNetwork = () => {
  const load = useCallback((map?: Map) => {
    if (map) {
      if (!map.getSource(layer.id)) {
        map.addSource(layer.id, {
          type: 'vector',
          url: layer.url,
          minzoom: 6,
          maxzoom: 14,
        });
        map.addLayer({
          id: layer.id,
          type: 'line',
          source: layer.id,
          layout: {
            visibility: 'none',
          },
          'source-layer': layer.sourceLayer,
          paint: {
            'line-color': '#000',
            'line-opacity': 0.25,
          },
        });
      }
    }
  }, []);

  const show = useCallback((map?: Map) => {
    if (map) {
      map.setLayoutProperty(layer.id, 'visibility', 'visible');
    }
  }, []);

  const hide = useCallback((map?: Map) => {
    if (map) {
      map.setLayoutProperty(layer.id, 'visibility', 'none');
    }
  }, []);

  const legend = {
    title: 'Red vial',
    intervals: [{
      color: '#000',
      label: 'Red vial',
    }],
  };

  return {
    show,
    hide,
    load,
    legend,
  };
};

export default useNationalRoadNetwork;
