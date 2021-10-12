import React, { useCallback } from 'react';

const ROAD_TILES = [
  {
    id: 'red-vial', 
    sourceLayer: 'Red_Vial_Actualizado-ax0w1b', 
    url: 'mapbox://daniel-itdp.cuwp66d7', 
    color: '#ff0000', 
    label: 'Red vial'
  },
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
          type: 'line',
          source: layer.sourceLayer,
          'source-layer': layer.sourceLayer,
          'paint': {
            'line-color': '#96968c',
            'line-opacity': 1,
          }
        });
      })
  }, [])

  return { load }
}

export default useRoadNetwork