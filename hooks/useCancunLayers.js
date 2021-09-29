import React, { useCallback } from 'react';
import mapboxgl from 'mapbox-gl';

const layers = {
  'atractores-5zs4sy': {
    url: 'mapbox://daniel-itdp.7j13qn0r',
    type: 'circle',
    popup: true,
    paint: {
      'circle-color': '#8c3951',
      'circle-stroke-color': '#FFF',
      'circle-stroke-width': 1,
      'circle-radius': 4,
    }
  },
  'comunidades-23c5zg': {
    url: 'mapbox://daniel-itdp.4ymvwjhc',
    type: 'fill',
    popup: true,
    paint: {
      'fill-color': '#00524C',
    }
  },
  'estaciones-5geu9s': {
    url: 'mapbox://daniel-itdp.4m7o3ife',
    type: 'circle',
    popup: true,
    paint: {
      'circle-color': '#FFF',
      'circle-stroke-color': '#000',
      'circle-stroke-width': 2,
      'circle-radius': 5,
    }
  },
  'limite-municipal-5et9dw': {
    url: 'mapbox://daniel-itdp.bsylc8oa',
    type: 'line',
    paint: {
      'line-color': '#e6e6dc',
      'line-width': 1	
    }
  },
  'limite-estatal-4fclwb': {
    url: 'mapbox://daniel-itdp.57hf0gek',
    type: 'line',
    paint: {
      'line-color': '#96968c',
      'line-width': 0.7	
    }
  },
  'trazo-56elpw': {
    url: 'mapbox://daniel-itdp.b2f7a077',
    type: 'line',
    paint: {
      'line-color': '#ba955c',
      'line-width': 2
    }
  },
}

const useCancunLayers = (map) => {
  const load = useCallback(() => {
    const paintExtraLayers = async () => {
      Object.keys(layers).forEach(async (layer) => {
        map.addSource(layer, {
          type: 'vector',
          url: layers[layer].url,
          minzoom: 6,
          maxzoom: 14
        });
        map.addLayer({
          id: layer,
          type: layers[layer].type,
          source: layer,
          'source-layer': layer,
          paint: layers[layer].paint,
        });
        
        if (layers[layer].popup) {
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            anchor: 'top',
            });
          map.on('mouseenter', layer, (e) => {
            const description = e.features[0].properties.Nombre || e.features[0].properties.Name;
            if (description) {
              popup.setLngLat(e.lngLat).setHTML(description).addTo(map);
            }
          });
          map.on('mouseleave', layer, () => {
            popup.remove();
          });
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