import React, { useCallback, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const layers = {
  'Atractores': {
    type: 'circle',
    paint: {
      'circle-color': '#8c3951'
    }
  },
  'Comunidades Sustentables': {
    type: 'fill',
    paint: {
      'fill-color': '#00534C',
    }
  },
  'Estaciones y paraderos': {
    type: 'circle',
    paint: {
      'circle-color': '#FFF',
      'circle-stroke-color': '#000',
      'circle-stroke-width': 2,
      'circle-radius': 5,
    }
  },
  'Limite Municipal': {
    type: 'line',
    paint: {
      'line-color': '#e6e6dc'
    }
  },
  'L¡mite Estatal': {
    type: 'line',
    paint: {
      'line-color': '#ba955c',
      'line-width': 2	
    }
  },
  'Trazo': {
    type: 'line',
    paint: {
      'line-color': '#ba955c'
    }
  },
}

const useCancunLayers = (map) => {
  const load = useCallback(() => {
    const paintExtraLayers = async () => {
      Object.keys(layers).forEach(async (layer) => {
        try {
          const response = await fetch(`api/cities/cancun/layers/${layer}`)
          const geojson = await response.json();
          map.addSource(layer, {
            type: 'geojson',
            data: geojson, 
          });
          map.addLayer({
            id: layer,
            type: layers[layer].type,
            source: layer,
            paint: layers[layer].paint,
          });
          
          if (layers[layer].type === 'circle') {
            const popup = new mapboxgl.Popup({
              closeButton: false,
              closeOnClick: false,
              anchor: 'top',
              });
            map.on('mouseenter', layer, (e) => {
              const description = e.features[0].properties.Nombre;
              popup.setLngLat(e.lngLat).setHTML(description).addTo(map);
            });
            map.on('mouseleave', layer, () => {
              popup.remove();
            });
          }
        } catch(e) {
          console.log(e)
        }
      })
    }

    if (map) {
      paintExtraLayers()
    }
  }, [map])

  return {load}
}

export default useCancunLayers