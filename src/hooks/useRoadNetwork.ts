import { Map } from 'mapbox-gl';
import React, { useCallback } from 'react';

const ROAD_TILES = [
  {
    id: 'red-vial',
    sourceLayer: 'Red_Vial_Actualizado-ax0w1b',
    url: 'mapbox://daniel-itdp.cuwp66d7',
    color: '#ff0000',
    label: 'Red vial',
  },
];

const useRoadNetwork = () => {
  const load = useCallback((map?: Map) => {
    ROAD_TILES.forEach((layer) => {
      if (map) {
        map.addSource(layer.sourceLayer, {
          type: 'vector',
          url: layer.url,
          minzoom: 8,
          maxzoom: 16,
        });
        map.addLayer({
          id: layer.sourceLayer,
          type: 'line',
          source: layer.sourceLayer,
          'source-layer': layer.sourceLayer,
          paint: {
            'line-color': '#F00',
            'line-opacity': 0.25,
          },
        });
      }
    });
  }, []);

  return { load };
};

export default useRoadNetwork;