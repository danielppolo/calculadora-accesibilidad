import React, { useCallback, useEffect } from 'react';
import { Legend } from 'src/types';
import useMap from './useMap';

const layer = {
  id: 'red-vial',
  sourceLayer: 'red_vial-bsfw1p',
  url: 'mapbox://daniel-itdp.0a0m3fxb',
  color: '#ff0000',
  label: 'Red vial',
};

const useNationalRoadNetwork = () => {
  const map = useMap();
  useEffect(() => {
    if (!map.getSource(layer.id)) {
      map.addSource(layer.id, {
        type: 'vector',
        url: layer.url,
        minzoom: 6,
        maxzoom: 14,
      });
      map.addLayer({
        id: layer.id,
        type: 'line',
        source: layer.id,
        layout: {
          visibility: 'none',
        },
        'source-layer': layer.sourceLayer,
        paint: {
          'line-color': '#000',
          'line-opacity': 0.25,
        },
      });
    }
  }, [map]);

  const show = useCallback(() => {
    map.setLayoutProperty(layer.id, 'visibility', 'visible');
  }, [map]);

  const hide = useCallback(() => {
    map.setLayoutProperty(layer.id, 'visibility', 'none');
  }, [map]);

  const legend: Legend = {
    title: 'Red vial',
    intervals: [{
      color: '#000',
      label: 'Red vial',
    }],
  };

  return {
    show,
    hide,
    legend,
  };
};

export default useNationalRoadNetwork;
