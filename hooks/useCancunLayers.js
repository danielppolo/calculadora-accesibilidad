import React, { useCallback } from 'react';
import mapboxgl from 'mapbox-gl';

const layers = {
  'Atractores-0t8xa6': {
    url: 'mapbox://odpolo.8z5yah82',
    type: 'circle',
    popup: true,
    paint: {
      'circle-color': '#8c3951'
    }
  },
  'Comunidades_Sustentables-537dcd': {
    url: 'mapbox://odpolo.2g75jf1m',
    type: 'fill',
    popup: true,
    paint: {
      'fill-color': '#00534C',
    }
  },
  'Estaciones_y_paraderos-cnjgnc': {
    url: 'mapbox://odpolo.8me4fhb8',
    type: 'circle',
    popup: true,
    paint: {
      'circle-color': '#FFF',
      'circle-stroke-color': '#000',
      'circle-stroke-width': 2,
      'circle-radius': 5,
    }
  },
  'Limite_Municipal-9w88tg': {
    url: 'mapbox://odpolo.3o0t1sh2',
    type: 'line',
    paint: {
      'line-color': '#e6e6dc',
      'line-width': 1	
    }
  },
  'Lmite_Estatal-aqiatz': {
    url: 'mapbox://odpolo.9tn2f51i',
    type: 'line',
    paint: {
      'line-color': '#ba955c',
      'line-width': 1	
    }
  },
  'Trazo-8m24oi': {
    url: 'mapbox://odpolo.bffy6chz',
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