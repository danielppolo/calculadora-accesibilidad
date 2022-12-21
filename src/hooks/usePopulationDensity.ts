import React, { useCallback, useEffect, useState } from 'react';
import { Legend } from 'src/types';
import { useMap } from 'src/context/map';
import { MAX_ZOOM, ZOOM_THRESHOLD } from 'src/constants';

const layer = {
  id: 'densidad',
  sourceLayer: 'densidad-b6bkp9',
  url: 'mapbox://daniel-itdp.49qyo6jo',
  color: '#ff0000',
  label: 'Densidad',
};

const colorIntervals = [
  ['#ffeda0', 10],
  ['#ffeda0', 20],
  ['#fed976', 50],
  ['#feb24c', 100],
  ['#fd8d3c', 200],
  ['#fc4e2a', 500],
  ['#e31a1c', 750],
  ['hsl(348, 100%, 37%)', 1000],
  ['#bd0026'],
] as const;

const usePopulationDensity = () => {
  const map = useMap();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (map.getSource(layer.id)) {
      return;
    }

    map.addSource(layer.id, {
      type: 'vector',
      url: layer.url,
      minzoom: ZOOM_THRESHOLD,
      maxzoom: MAX_ZOOM,
    });
    map.addLayer({
      id: layer.id,
      type: 'fill',
      source: layer.id,
      layout: {
        visibility: active ? 'visible' : 'none',
      },
      'source-layer': layer.sourceLayer,
      paint: {
        'fill-color': ['step', ['get', 'Densidad'], ...colorIntervals.flat()],
        'fill-opacity': 0.5,
      },
    });
  }, [active, map]);

  const toggle = useCallback(() => {
    if (active) {
      map.setLayoutProperty(layer.id, 'visibility', 'none');
      setActive(false);
    } else {
      map.setLayoutProperty(layer.id, 'visibility', 'visible');
      setActive(true);
    }
  }, [active, map]);

  const legend: Legend = {
    title: 'Densidad de población',
    intervals: colorIntervals.map(([color, value], i) => ({
      color,
      label: `${value || '1000+'} hab`,
    })),
  };

  return {
    isActive: active,
    toggle,
    legend,
  };
};

export default usePopulationDensity;
