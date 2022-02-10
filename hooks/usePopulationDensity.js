import React, { useCallback } from 'react';

const layer = {
  id: 'red-vial',
  sourceLayer: 'densidad-b6bkp9',
  url: 'mapbox://daniel-itdp.49qyo6jo',
  color: '#ff0000',
  label: 'Red vial',
}

const colorIntervals = ["#ffeda0",10,"#ffeda0",20,"#fed976",50,"#feb24c",100,"#fd8d3c",200,"#fc4e2a",500,"#e31a1c",750,"hsl(348, 100%, 37%)",1000,"#bd0026"]

const usePopulationDensity = () => {
  const load = useCallback((map) => {
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
            'fill-color': ["step",["get","Densidad"], ...colorIntervals],
            'fill-opacity': 0.5,
          },
        });
      }
    }
  }, []);

  const show = useCallback((map) => {
    if (map) {
        map.setLayoutProperty(layer.id, 'visibility', 'visible');
    }
  }, []);

  const hide = useCallback((map) => {
    if (map) {
        map.setLayoutProperty(layer.id, 'visibility', 'none');
    }
  }, []);

  const legend = {
    title: 'Densidad de población',
    intervals: colorIntervals.map((color, value) => ({
      color: color,
      label: `${value} hab`,
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
