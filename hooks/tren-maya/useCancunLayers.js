import { useCallback } from 'react';
import mapboxgl from 'mapbox-gl';

const CANCUN_TILES = [
  // {
  //   id: 'limite-municipal',
  //   sourceLayer: 'limite-municipal-5et9dw',
  //   url: 'mapbox://daniel-itdp.bsylc8oa',
  //   type: 'line',
  //   paint: {
  //     'line-color': '#e6e6dc',
  //     'line-width': 1
  //   }
  // },
  {
    id: 'limite-estatal',
    sourceLayer: 'limite-estatal-4fclwb',
    url: 'mapbox://daniel-itdp.57hf0gek',
    type: 'line',
    paint: {
      'line-color': '#96968c',
      'line-width': 0.7,
    },
  },
  {
    id: 'trazo',
    sourceLayer: 'trazo-tren-maya',
    url: 'mapbox://daniel-itdp.trazo-tren-maya',
    type: 'line',
    paint: {
      'line-color': '#ba955c',
      'line-width': 2,
    },
  },
  {
    id: 'comunidades',
    sourceLayer: 'comunidades-sustantables-tren-6pcwgj',
    url: 'mapbox://daniel-itdp.0e6ljym4',
    type: 'fill',
    popup: true,
    paint: {
      'fill-color': '#00524C',
    },
  },
  {
    id: 'atractores',
    sourceLayer: 'atractores-tren-maya-abstract-c5957d',
    url: 'mapbox://daniel-itdp.1dp36h9b',
    type: 'circle',
    popup: true,
    paint: {
      'circle-color': '#8c3951',
      'circle-stroke-color': '#FFF',
      'circle-stroke-width': ['step', ['zoom'], 0, 6, 0.5, 11, 1],
      'circle-radius': ['step', ['zoom'], 1, 6, 2, 8, 3, 10, 4, 12, 6, 14, 8, 16, 10, 18, 12, 22, 14],
    },
  },
  {
    id: 'zmc',
    sourceLayer: 'zona-metropolitana-cancun-9ygbru',
    url: 'mapbox://daniel-itdp.9x13h76u',
    type: 'line',
    paint: {
      'line-color': '#000',
      'line-width': 1,
      'line-dasharray': [3, 3],
    },
  },
  {
    id: 'estaciones',
    sourceLayer: 'estaciones-tren-maya-abstract-8gkm8u',
    url: 'mapbox://daniel-itdp.c7owxec1',
    type: 'circle',
    popup: true,
    paint: {
      'circle-stroke-color': '#000',
      'circle-color': '#FFF',
      'circle-stroke-width': 2,
      'circle-radius': 4,
    },
  },
];

const useCancunLayers = () => {
  const load = useCallback((map) => {
    CANCUN_TILES.forEach((layer) => {
      map.addSource(layer.sourceLayer, {
        type: 'vector',
        url: layer.url,
        minzoom: 6,
        maxzoom: 16,
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
          className: 'black-popup',
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
    });
  }, []);

  return { load };
};

export default useCancunLayers;
