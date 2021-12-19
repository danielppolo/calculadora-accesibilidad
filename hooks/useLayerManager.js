import { useState } from 'react';
import Gradient from 'javascript-color-gradient';
import { NUMBER_OF_BUCKETS } from '../constants';
import {
  getIntervals, getColor, getLegend, convertToGeoJSON,
} from '../utils';

const useLayerManager = () => {
  const [state] = useState({});
  const [legends] = useState({});
  const [layerMetadata] = useState({});
  const [geojson] = useState({});
  const [current, setCurrent] = useState();

  const add = ({
    map,
    legendTitle,
    id,
    features,
    property,
    maxValue,
    visible,
    metadata,
    unit,
    beforeId,
    stepSize = NUMBER_OF_BUCKETS,
    reverseColors = false,
    colors = ['#f8dda1', '#f1bb43'],
    opacity = 0.5,
    solid = false,
  }) => {
    if (map && !(id in state)) {
      const [color1, color2] = colors;

      // Get color intervals
      const intervals = getIntervals(maxValue, stepSize);
      const reversedIntervals = [...intervals].reverse();
      const colorGradient = new Gradient()
        .setGradient(color1, color2)
        .setMidpoint(stepSize)
        .getArray();
      const colorIntervals = reverseColors ? [...colorGradient].reverse() : colorGradient;
      const legendColorIntervals = reverseColors ? colorGradient : [...colorGradient].reverse();
      const geojsonFeatures = convertToGeoJSON(features);

      map.addSource(id, {
        type: 'geojson',
        data: geojsonFeatures,
      });

      map.addLayer({
        id,
        type: 'fill',
        source: id,
        layout: {
          visibility: visible ? 'visible' : 'none',
        },
        // filter: ['>', ['get', property], 0],
        paint: {
          'fill-opacity': opacity,
          'fill-color': solid ? color1 : getColor(property, reversedIntervals, colorIntervals),
          'fill-outline-color': ['case',
            ['has', 'selected'], ['rgba', 0, 0, 0, 1],
            ['rgba', 255, 0, 0, 0],
          ],
        },
      }, beforeId);

      state[id] = true;
      geojson[id] = geojsonFeatures;
      layerMetadata[id] = metadata;
      legends[id] = {
        title: legendTitle,
        intervals: getLegend(intervals, legendColorIntervals, unit),
      };

      if (visible) {
        setCurrent(id);
      }
    }
  };

  const show = (map, id) => {
    if (id in state && map) {
      map.setLayoutProperty(id, 'visibility', 'visible');
      setCurrent(id);
    }
  };

  const hide = (map, id = null) => {
    if (id && map && id in state) {
      map.setLayoutProperty(id, 'visibility', 'none');
    }
  };

  const hideAll = (map) => {
    Object.keys(state).forEach((layerId) => {
      map.setLayoutProperty(layerId, 'visibility', 'none');
    });
  };

  return {
    state,
    add,
    hide,
    hideAll,
    show,
    current,
    geojson: geojson[current] || {},
    legend: legends[current] || [],
    metadata: layerMetadata[current] || {},
  };
};
export default useLayerManager;
