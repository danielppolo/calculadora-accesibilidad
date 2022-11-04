import { useCallback } from 'react';
import { FillPaint, Map, Popup, LinePaint } from 'mapbox-gl';
import { Legend } from 'src/types';

interface MapboxLayer {
  id: string;
  sourceLayer: string;
  url: string;
  type: 'fill' | 'line';
  color: string;
  label: string;
  paint: FillPaint | LinePaint;
  popup?: boolean;
  popupDescriptionKey?: string;
}

const useLayer = (layerList: MapboxLayer[], title = '') => {
  const load = useCallback(
    (map: Map) => {
      layerList.forEach((layer) => {
        const { id, sourceLayer, url, type, popup, popupDescriptionKey } =
          layer;
        map.addSource(id, {
          type: 'vector',
          url,
          minzoom: 6,
          maxzoom: 16,
        });
        map.addLayer({
          id,
          type,
          source: id,
          layout: {
            visibility: 'none',
          },
          'source-layer': sourceLayer,
          paint: layer?.paint as any,
        });

        if (popup && popupDescriptionKey) {
          const popup = new Popup({
            className: 'black-popup',
            closeButton: false,
            closeOnClick: false,
            anchor: 'top',
          });
          map.on('mouseenter', id, (e) => {
            const description =
              popupDescriptionKey &&
              e?.features?.[0]?.properties?.[popupDescriptionKey];
            if (description) {
              popup.setLngLat(e.lngLat).setHTML(description).addTo(map);
            }
          });
          map.on('mouseleave', id, () => {
            popup.remove();
          });
        }
      });
    },
    [layerList]
  );

  const show = useCallback(
    (map: Map) => {
      layerList.forEach((layer) => {
        map.setLayoutProperty(layer.id, 'visibility', 'visible');
      });
    },
    [layerList]
  );

  const hide = useCallback(
    (map: Map) => {
      layerList.forEach((layer) => {
        map.setLayoutProperty(layer.id, 'visibility', 'none');
      });
    },
    [layerList]
  );

  const legend: Legend = {
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
