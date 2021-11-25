import { useCallback } from 'react';
import mapboxgl from 'mapbox-gl';

const useLayer = (layerList, title = '') => {
  const load = useCallback((map) => {
    layerList.forEach((layer) => {
      map.addSource(layer.id, {
        type: 'vector',
        url: layer.url,
        minzoom: 6,
        maxzoom: 16,
      });
      map.addLayer({
        id: layer.id,
        type: layer.type,
        source: layer.id,
        layout: {
          visibility: 'none',
        },
        'source-layer': layer.sourceLayer,
        paint: layer.paint,
      });

      if (layer.popup && layer.popupDescriptionKey) {
        const popup = new mapboxgl.Popup({
          className: 'black-popup',
          closeButton: false,
          closeOnClick: false,
          anchor: 'top',
        });
        map.on('mouseenter', layer.id, (e) => {
          const description = e.features[0].properties[layer.popupDescriptionKey];
          if (description) {
            popup.setLngLat(e.lngLat).setHTML(description).addTo(map);
          }
        });
        map.on('mouseleave', layer.id, () => {
          popup.remove();
        });
      }
    });
  }, [layerList]);

  const show = useCallback((map) => {
    layerList.forEach((layer) => {
      map.setLayoutProperty(layer.id, 'visibility', 'visible');
    });
  }, [layerList]);

  const hide = useCallback((map) => {
    layerList.forEach((layer) => {
      map.setLayoutProperty(layer.id, 'visibility', 'none');
    });
  }, [layerList]);

  const legend = {
    title,
    intervals: layerList.map((layer) => ({
      color: layer.color,
      label: layer.label,
    })),
  };

  return {
    load,
    show,
    hide,
    legend,
  };
};

export default useLayer;
