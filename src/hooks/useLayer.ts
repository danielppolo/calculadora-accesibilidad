import { useCallback, useEffect, useState } from 'react';
import { FillPaint, Map, Popup, LinePaint } from 'mapbox-gl';
import { Legend } from 'src/types';
import { useMap } from 'src/context/map';
import { MAX_ZOOM, ZOOM_THRESHOLD } from 'src/constants';

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
  const map = useMap();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (map) {
      layerList.forEach((layer) => {
        const { id, sourceLayer, url, type, popup, popupDescriptionKey } =
          layer;

        if (map.getLayer(id)) {
          return;
        }

        map.addSource(id, {
          type: 'vector',
          url,
          minzoom: ZOOM_THRESHOLD,
          maxzoom: MAX_ZOOM,
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
          const popupElement = new Popup({
            className: 'black-popup',
            closeButton: false,
            closeOnClick: false,
            anchor: 'top',
          });

          map
            .on('mouseenter', id, (e) => {
              const description =
                popupDescriptionKey &&
                e?.features?.[0]?.properties?.[popupDescriptionKey];
              if (description) {
                popupElement
                  .setLngLat(e.lngLat)
                  .setHTML(description)
                  .addTo(map);
              }
            })
            .on('mouseleave', id, () => {
              popupElement.remove();
            });
        }
      });
    }
  }, [layerList, map]);

  const toggle = useCallback(() => {
    if (active) {
      layerList.forEach((layer) => {
        map.setLayoutProperty(layer.id, 'visibility', 'none');
      });
      setActive(false);
    } else {
      layerList.forEach((layer) => {
        map.setLayoutProperty(layer.id, 'visibility', 'visible');
      });
      setActive(true);
    }
  }, [active, layerList, map]);

  const legend: Legend = {
    title,
    intervals: layerList.map((layer) => ({
      color: layer.color,
      label: layer.label,
    })),
  };

  return {
    isActive: active,
    toggle,
    legend,
  };
};

export default useLayer;
