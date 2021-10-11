import React, { useCallback } from 'react';

const ROAD_TILES = [
  {
    id: 'tren-maya-ruta-ciclista', 
    sourceLayer: 'red-vial-bu2vky', 
    url: 'mapbox://daniel-itdp.agpu75bd', 
    color: '#96968c', 
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
            'line-opacity': 0.5,
          }
        });
      })
  }, [])

  return { load }
}

export default useRoadNetwork