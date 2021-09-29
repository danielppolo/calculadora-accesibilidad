import { useState } from 'react';
import Gradient from "javascript-color-gradient";
import { NUMBER_OF_BUCKETS } from '../constants';
import { getIntervals, getColor, getLegend, convertToGeoJSON } from '../utils';

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
    beforeId,
    stepSize = NUMBER_OF_BUCKETS, 
  }) => {
    if (map && !(id in state)) {
      console.log('addLayer', id);
      const color1 = "#00534C";
      const color2 = "#e1f4ef";

      // Get color intervals
      const intervals = getIntervals(maxValue, stepSize)
      const reversedIntervals = [...intervals].reverse()
      const colorIntervals = new Gradient()
        .setGradient(color1, color2)
        .setMidpoint(stepSize)
        .getArray()
      const geojsonFeatures = convertToGeoJSON(features)
      
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
          'fill-opacity': 0.7,
          'fill-color': getColor(property, reversedIntervals, colorIntervals),
        },
      }, beforeId);

      state[id] = true;
      geojson[id] = geojsonFeatures;
      layerMetadata[id] = metadata
      legends[id] = {
        title: legendTitle,
        intervals: getLegend(intervals, [...colorIntervals].reverse()),
      };
      
      if (visible) {
        setCurrent(id);
      }
    }
  };

  const show = (map, id) => {
    console.log(state, id, id in state, map)
    if (id in state && map) {
      Object.keys(state).forEach((layerId) => {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      });
      console.log('show', id);
      map.setLayoutProperty(id, 'visibility', 'visible');
      setCurrent(id);
    }
  };

  const hide = (map, id = null) => {
    if (id && map && id in state ) {
      map.setLayoutProperty(id, 'visibility', 'none');
    } else if (map) {
      Object.keys(state).forEach((layerId) => {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      });
    }
  };

  return {
    state,
    add,
    hide,
    show,
    current,
    geojson: geojson[current] || {},
    legend: legends[current] || [],
    metadata: layerMetadata[current] || {},
  };
};
export default useLayerManager;
