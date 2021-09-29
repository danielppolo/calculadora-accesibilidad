import { useState } from 'react';
import Gradient from "javascript-color-gradient";

const colorGradient = new Gradient();
const color1 = "#00534C";
const color2 = "#e1f4ef";
colorGradient.setGradient(color1, color2);
const colorArr = colorGradient.getArray();

const convertToGeoJSON = (features) => ({
  type: 'FeatureCollection',
  features,
});
const NUMBER_OF_BUCKETS = 10;
const getIntervals = ( maxValue, steps = NUMBER_OF_BUCKETS) => {
  const intervalStep = maxValue > steps ? steps : maxValue;
  const interval = maxValue / intervalStep;
  return Array.from({length: intervalStep}, (_, i) => Math.ceil(interval * (i + 1)))
}
const getLegend = (intervals, colors) => intervals.map((interval, i) => {
  const start = Intl.NumberFormat().format((intervals[i-1] || 0) + 1)
  const end = Intl.NumberFormat().format(interval)
  const isSameNumber = start === end;
  return ({
    color: colors[i],
    label: isSameNumber ? start : `${start} - ${end}`,
  })
})
const getColor = (property, intervals) => {
  const rgbaCases = []
  intervals.forEach((interval, i) => {
    rgbaCases.unshift(['<=', ['get', property], interval], colorArr[i])
  })
  return ["case",
  ['==', ['get', property], 0], 'transparent',
  ...rgbaCases,
  'transparent',
  ]
}

const useLayerCreate = () => {
  const [layers] = useState({});
  const [legends] = useState({});
  const [layerMetadata] = useState({});
  const [current, setCurrent] = useState();

  const addLayer = ({
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
    if (map && !(id in layers)) {
      console.log('addLayer', id);

      // Get color intervals
      const intervals = getIntervals(maxValue, stepSize)
      const reversedIntervals = [...intervals].reverse()

      map.addSource(id, {
        type: 'geojson',
        data: convertToGeoJSON(features), 
      });
      map.addLayer({
        id,
        type: 'fill',
        source: id,
        layout: {
          visibility: visible ? 'visible' : 'none',
        },
        paint: {
          'fill-opacity': 0.7,
          'fill-color': getColor(property, reversedIntervals),
          'fill-outline-color': [
            'rgba',
            0,
            0,
            0,
            0.2,	
          ],
        },
      }, beforeId);
      layers[id] = true;
      layerMetadata[id] = metadata
      legends[id] = {
        title: legendTitle,
        intervals: getLegend(intervals, [...colorArr].reverse()),
      };
      if (visible) {
        setCurrent(id);
      }
    }
  };

  const showLayer = (map, id) => {
    console.log(layers, id, id in layers, map)
    if (id in layers && map) {
      Object.keys(layers).forEach((layerId) => {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      });
      console.log('show', id);
      map.setLayoutProperty(id, 'visibility', 'visible');
      setCurrent(id);
    }
  };

  const hide = (map, id = null) => {
    if (id && map && id in layers ) {
      map.setLayoutProperty(id, 'visibility', 'none');
    } else if (map) {
      Object.keys(layers).forEach((layerId) => {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      });
    }
  };

  return {
    state: layers,
    add: addLayer,
    hide,
    show: showLayer,
    current,
    legend: legends[current] || [],
    metadata: layerMetadata[current] || {},
  };
};
export default useLayerCreate;
