import React, { useCallback } from 'react';

const ROAD_TILES = [
  //  TODO: add tilesets
]

const useRoadNetwork = () => {
  const load = useCallback((map) => {
      ROAD_TILES.forEach((layer) => {
        map.addSource(layer.sourceLayer, {
          type: 'vector',
          url: layer.url,
          minzoom: 6,
          maxzoom: 14
        });
        map.addLayer({
          id: layer.sourceLayer,
          type: layer.type,
          source: layer.sourceLayer,
          'source-layer': layer.sourceLayer,
          paint: layer.paint,
        });
      })
  }, [])

  return { load }
}

export default useRoadNetwork