import React, { useCallback } from 'react';

const MARGINALIZATION_TILES = [
  {
    id: 'muy-alto', 
    sourceLayer: 'muy-alto-4gqx10', 
    url: 'mapbox://daniel-itdp.43cq9l5l', 
    color: '#EB4D74', 
    label: 'Muy Alto'
  },
  {
    id: 'alto', 
    sourceLayer: 'alto-9d92hn', 
    url: 'mapbox://daniel-itdp.3o54h1cd', 
    color: '#E96030', 
    label: 'Alto'
  },
  {
    id: 'medio', 
    sourceLayer: 'medio-copnh9', 
    url: 'mapbox://daniel-itdp.d6y0e1oe', 
    color: '#FBD900', 
    label: 'Medio'
  },
  {
    id: 'bajo', 
    sourceLayer: 'bajo-binxq0', 
    url: 'mapbox://daniel-itdp.7eb1ttdq', 
    color: '#3C60AC', 
    label: 'Bajo'
  },
  {
    id: 'muy-bajo', 
    sourceLayer: 'muy-bajo-6b30ev', 
    url: 'mapbox://daniel-itdp.8dgonb06', 
    color: '#7456A4', 
    label: 'Muy Bajo'
  },
  {
    id: 'otros', 
    sourceLayer: 'otros-1qjpnd', 
    url: 'mapbox://daniel-itdp.cnwsf9qk' , 
    color: '#6BBE49',   
    label: 'NA'
  },
]

const useMarginalizationLayers = (map) => {
  const load = useCallback(() => {
    if (map) {
        MARGINALIZATION_TILES.forEach(ageb => {
          map.addSource(ageb.id, {
            type: 'vector',
            url: ageb.url,
            minzoom: 6,
            maxzoom: 14
          });
          map.addLayer({
            id: ageb.id,
            type: 'fill',
            source: ageb.id,
            layout: {
              visibility:  'none',
            },
            'source-layer': ageb.sourceLayer,
            'paint': {
              'fill-color': ageb.color,
              'fill-opacity': 0.5,
            }
          });
        })
      }
  }, [map])

  const show = useCallback(() => {
    if (map) {
      MARGINALIZATION_TILES.forEach((ageb) => {
        map.setLayoutProperty(ageb.id, 'visibility', 'visible');
      });
    }
  }, [map])
 
  const hide = useCallback(() => {
    if (map) {
      MARGINALIZATION_TILES.forEach((ageb) => {
        map.setLayoutProperty(ageb.id, 'visibility', 'none');
      });
    }
  }, [map])

  const legend = {
    title: 'Marginaci??n por AGEB',
    intervals: MARGINALIZATION_TILES.map((ageb) => ({
      color: ageb.color,
      label: ageb.label,
    }))
  }

  return {
    show,
    hide,
    load,
    legend,
  }
}

export default useMarginalizationLayers