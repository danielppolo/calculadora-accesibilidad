import React, { useCallback, useEffect } from 'react';

const AGEBS = {
  'Muy_alto-6zbmho': {url: 'mapbox://odpolo.6k6kk1a4', color: '#9b2226'},
  'Alto-4b86o1': {url: 'mapbox://odpolo.dk8mz5xa', color: '#ae2012'},
  'Medio-az80tm': {url: 'mapbox://odpolo.24orbjuf', color: '#bb3e03'},
  'Bajo-4m9kh1': {url: 'mapbox://odpolo.a3y8yl5b', color: '#ca6702'},
  'Muy_bajo-6ks9o9': {url: 'mapbox://odpolo.8tzfdum5', color: '#ee9b00'},
  'Otros-6lcusx': {url: 'mapbox://odpolo.dexy4fdd' , color: '#e9d8a6'},
}

const useEconomicTiles = (map) => {
  const load = useCallback(() => {
    const paintTiles = () => {
      try {
        Object.keys(AGEBS).forEach(key => {
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
              // 'fill-opacity': 0.8,
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

  return {
    show,
    hide,
    load,
  }
}

export default useEconomicTiles