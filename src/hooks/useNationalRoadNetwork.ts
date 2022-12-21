import React, { useCallback, useEffect, useState } from 'react';
import { Legend } from 'src/types';
import { useMap } from 'src/context/map';
import { MAX_ZOOM, ZOOM_THRESHOLD } from 'src/constants';

const layer = {
  id: 'red-vial',
  sourceLayer: 'red_vial-bsfw1p',
  url: 'mapbox://daniel-itdp.0a0m3fxb',
  color: '#ff0000',
  label: 'Red vial',
};

const useNationalRoadNetwork = () => {
  const map = useMap();
  const [active, setActive] = useState(true);

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
      type: 'line',
      source: layer.id,
      layout: {
        visibility: active ? 'visible' : 'none',
      },
      'source-layer': layer.sourceLayer,
      paint: {
        'line-color': '#000',
        'line-opacity': 0.25,
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
    title: 'Red vial',
    intervals: [
      {
        color: '#000',
        label: 'Red vial',
      },
    ],
  };

  return {
    isActive: active,
    toggle,
    legend,
  };
};

export default useNationalRoadNetwork;
