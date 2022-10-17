import React, { useCallback } from 'react';
import { Legend } from 'src/types';
import useMap from './useMap';

const layer = {
  id: 'densidad',
  sourceLayer: 'densidad-b6bkp9',
  url: 'mapbox://daniel-itdp.49qyo6jo',
  color: '#ff0000',
  label: 'Densidad',
};

const colorIntervals = [['#ffeda0', 10], ['#ffeda0', 20], ['#fed976', 50], ['#feb24c', 100], ['#fd8d3c', 200], ['#fc4e2a', 500], ['#e31a1c', 750], ['hsl(348, 100%, 37%)', 1000], ['#bd0026']] as const;

const usePopulationDensity = () => {
  const map = useMap();
  const load = useCallback(() => {
    if (map) {
      if (!map.getSource(layer.id)) {
        map.addSource(layer.id, {
          type: 'vector',
          url: layer.url,
          minzoom: 6,
          maxzoom: 14,
        });
        map.addLayer({
          id: layer.id,
          type: 'fill',
          source: layer.id,
          layout: {
            visibility: 'none',
          },
          'source-layer': layer.sourceLayer,
          paint: {
            'fill-color': ['step', ['get', 'Densidad'], ...colorIntervals.flat()],
            'fill-opacity': 0.5,
          },
        });
      }
    }
  }, [map]);

  const show = useCallback(() => {
    if (map) {
      map.setLayoutProperty(layer.id, 'visibility', 'visible');
    }
  }, [map]);

  const hide = useCallback(() => {
    if (map) {
      map.setLayoutProperty(layer.id, 'visibility', 'none');
    }
  }, [map]);

  const legend: Legend = {
    title: 'Densidad de población',
    intervals: colorIntervals.map(([color, value], i) => ({
      color,
      label: `${value || '1000+'} hab`,
    })),
  };

  return {
    show,
    hide,
    load,
    legend,
  };
};

export default usePopulationDensity;
