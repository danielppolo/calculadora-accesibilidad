import React, { useCallback } from 'react';
import mapboxgl from 'mapbox-gl';

const CANCUN_TILES = [
  {
    id: 'limite-municipal',
    sourceLayer: 'limite-municipal-5et9dw',
    url: 'mapbox://daniel-itdp.bsylc8oa',
    type: 'line',
    paint: {
      'line-color': '#e6e6dc',
      'line-width': 1	
    }
  },
  {
    id: 'limite-estatal',
    sourceLayer: 'limite-estatal-4fclwb',
    url: 'mapbox://daniel-itdp.57hf0gek',
    type: 'line',
    paint: {
      'line-color': '#96968c',
      'line-width': 0.7	
    }
  },
  {
    id: 'trazo',
    sourceLayer: 'trazo-56elpw',
    url: 'mapbox://daniel-itdp.b2f7a077',
    type: 'line',
    paint: {
      'line-color': '#ba955c',
      'line-width': 2
    }
  },
  {
    id: 'comunidades',
    sourceLayer: 'comunidades-23c5zg',
    url: 'mapbox://daniel-itdp.4ymvwjhc',
    type: 'fill',
    popup: true,
    paint: {
      'fill-color': '#00524C',
    }
  },
  {
    id: 'estaciones',
    sourceLayer: 'estaciones-5geu9s',
    url: 'mapbox://daniel-itdp.4m7o3ife',
    type: 'circle',
    popup: true,
    paint: {
      'circle-color': '#000',
      'circle-stroke-color': '#FFF',
      'circle-stroke-width': 2,
      'circle-radius': 6,
    }
  },
  {
    id: 'atractores',
    sourceLayer: 'atractores-5zs4sy',
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
]

const useCancunLayers = (map) => {
  const load = useCallback(() => {
    if (map) {
      CANCUN_TILES.forEach((layer) => {
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
        
        if (layer.popup) {
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            anchor: 'top',
            });
          map.on('mouseenter', layer.sourceLayer, (e) => {
            const description = e.features[0].properties.Nombre || e.features[0].properties.Name;
            if (description) {
              popup.setLngLat(e.lngLat).setHTML(description).addTo(map);
            }
          });
          map.on('mouseleave', layer.sourceLayer, () => {
            popup.remove();
          });
        }
      })
    }
  }, [map])

  return { load }
}

export default useCancunLayers