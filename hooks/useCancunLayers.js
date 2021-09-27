import React, { useEffect } from 'react';

const layers = [
  'Atractores',
  'Comunidades Sustentables',
  'Estaciones y paraderos',
  'Limite Municipal',
  'L¡mite Estatal',
  'Trazo',
]

const useCancunLayers = (map) => {
  useEffect(() => {
    const paintExtraLayers = async () => {
      try {
        layers.forEach(async (layer) => {
          const response = await fetch(`api/cities/cancun/layers/${layer}`)
          const geojson = await response.json();
          map.addSource(layer, {
            type: 'geojson',
            data: geojson, 
          });
          map.addLayer({
            id: layer,
            type: 'line',
            source: layer,
            paint: {
              'line-color': [
                'rgba',
                0,
                0,
                0,
                0.3,	
              ],
            },
          });
        })
      } catch(e) {
        console.error(e)
      }
    }

    if (map) {
      paintExtraLayers()
    }
  }, [map])
}

export default useCancunLayers