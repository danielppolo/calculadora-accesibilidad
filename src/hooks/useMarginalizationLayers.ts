import { Map } from 'mapbox-gl';
import { useCallback } from 'react';
import { Legend } from 'src/types';

const MARGINALIZATION_TILES = [
  {
    id: 'muy-alto',
    sourceLayer: 'muy-alto-4gqx10',
    url: 'mapbox://daniel-itdp.43cq9l5l',
    color: '#da546f',
    label: 'Muy Alto',
  },
  {
    id: 'alto',
    sourceLayer: 'alto-9d92hn',
    url: 'mapbox://daniel-itdp.3o54h1cd',
    color: '#e27660',
    label: 'Alto',
  },
  {
    id: 'medio',
    sourceLayer: 'medio-copnh9',
    url: 'mapbox://daniel-itdp.d6y0e1oe',
    color: '#e99952',
    label: 'Medio',
  },
  {
    id: 'bajo',
    sourceLayer: 'bajo-binxq0',
    url: 'mapbox://daniel-itdp.7eb1ttdq',
    color: '#f1bb43',
    label: 'Bajo',
  },
  {
    id: 'muy-bajo',
    sourceLayer: 'muy-bajo-6b30ev',
    url: 'mapbox://daniel-itdp.8dgonb06',
    color: '#bdb64a',
    label: 'Muy Bajo',
  },
  {
    id: 'otros',
    sourceLayer: 'otros-1qjpnd',
    url: 'mapbox://daniel-itdp.cnwsf9qk',
    color: '#88b152',
    label: 'NA',
  },
];

const useMarginalizationLayers = () => {
  const load = useCallback((map?: Map) => {
    if (map) {
      MARGINALIZATION_TILES.forEach((ageb) => {
        if (!map.getSource(ageb.id)) {
          map.addSource(ageb.id, {
            type: 'vector',
            url: ageb.url,
            minzoom: 6,
            maxzoom: 14,
          });
          map.addLayer({
            id: ageb.id,
            type: 'fill',
            source: ageb.id,
            layout: {
              visibility: 'none',
            },
            'source-layer': ageb.sourceLayer,
            paint: {
              'fill-color': ageb.color,
              'fill-opacity': 0.5,
            },
          });
        }
      });
    }
  }, []);

  const show = useCallback((map?: Map) => {
    if (map) {
      MARGINALIZATION_TILES.forEach((ageb) => {
        map.setLayoutProperty(ageb.id, 'visibility', 'visible');
      });
    }
  }, []);

  const hide = useCallback((map?: Map) => {
    if (map) {
      MARGINALIZATION_TILES.forEach((ageb) => {
        map.setLayoutProperty(ageb.id, 'visibility', 'none');
      });
    }
  }, []);

  const legend: Legend = {
    title: 'Marginación por AGEB',
    intervals: MARGINALIZATION_TILES.map((ageb) => ({
      color: ageb.color,
      label: ageb.label,
    })),
  };

  return {
    show,
    hide,
    load,
    legend,
  };
};

export default useMarginalizationLayers;
