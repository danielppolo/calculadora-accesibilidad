import React, { useCallback, useEffect } from 'react';
import Gradient from "javascript-color-gradient";

const AGEBS = {
  'muy-alto-4gqx10': {url: 'mapbox://daniel-itdp.43cq9l5l', color: '#EB4D74', label: 'Muy Alto'},
  'alto-9d92hn': {url: 'mapbox://daniel-itdp.3o54h1cd', color: '#E96030', label: 'Alto'},
  'medio-copnh9': {url: 'mapbox://daniel-itdp.d6y0e1oe', color: '#FBD900', label: 'Medio'},
  'bajo-binxq0': {url: 'mapbox://daniel-itdp.7eb1ttdq', color: '#3C60AC', label: 'Bajo'},
  'muy-bajo-6b30ev': {url: 'mapbox://daniel-itdp.8dgonb06', color: '#7456A4', label: 'Muy Bajo'},
  'otros-1qjpnd': {url: 'mapbox://daniel-itdp.cnwsf9qk' , color: '#6BBE49',   label: 'NA'},
}

const colorGradient = new Gradient();
const color1 = "#EB4D74";
const color2 = "#ECB0C2";
colorGradient.setGradient(color1, color2);
const colorArr = colorGradient.getArray(Object.keys(AGEBS).length);


const useEconomicTiles = (map) => {
  const load = useCallback(() => {
    const paintTiles = () => {
      try {
        Object.keys(AGEBS).forEach((key, index) => {
          map.addSource(key, {
            type: 'vector',
            url: AGEBS[key].url,
            minzoom: 6,
            maxzoom: 14
          });
          map.addLayer({
            id: key,
            type: 'fill',
            source: key,
            layout: {
              visibility:  'none',
            },
            'source-layer': key,
            'paint': {
              'fill-color': AGEBS[key].color,
              'fill-opacity': 0.7,
            }
          });
        })
      } catch(e) {
        console.log(e)
      }
    }

    if (map) {
      paintTiles()
    }
  }, [map])

  const show = () => {
    if (map) {
      Object.keys(AGEBS).forEach((layerId) => {
        map.setLayoutProperty(layerId, 'visibility', 'visible');
      });
    }
  }
 
  const hide = () => {
    if (map) {
      Object.keys(AGEBS).forEach((layerId) => {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      });
    }
  }

  const legend = {
    title: 'Marginación por AGEB',
    intervals: Object.keys(AGEBS).map((key) => ({
      color: AGEBS[key].color,
      label: AGEBS[key].label,
    }))
  }

  return {
    show,
    hide,
    load,
    legend,
  }
}

export default useEconomicTiles