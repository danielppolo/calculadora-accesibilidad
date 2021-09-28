import { useState } from 'react';

const convertToGeoJSON = (features) => ({
  type: 'FeatureCollection',
  features,
});
const NUMBER_OF_BUCKETS = 10;
const BASE_COLOR = 50;
const convertToHex = (number) => parseInt(number, 10).toString(16)
const getColors = (steps = NUMBER_OF_BUCKETS) =>  Array.from({length: steps}, (_, i) => BASE_COLOR + ((255 - BASE_COLOR) / NUMBER_OF_BUCKETS) * (i + 1))
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
const getColorCase = (property, intervals, colors) => {
  const rgbaCases = [['==', ['get', property], 0], 0]
  intervals.forEach((interval, i) => {
    rgbaCases.unshift(['<=', ['get', property], interval], colors[i])
  })
  return ["case",
  ...rgbaCases,
  0,
  ]
}

const useLayerCreate = () => {
  const [layers] = useState({});
  const [legends] = useState({});
  const [layerMetadata] = useState({});
  const [current, setCurrent] = useState();

  const addLayer = ({
    map, 
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
      const colors = getColors(intervals.length)
      const reversedColors = [...colors].reverse()

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
          'fill-color': [
            'rgba',
            25,
            getColorCase(property, reversedIntervals, reversedColors),
            25,
            ["case",
              ['>', ['get', property], 0], 0.7,
              ['==', ['get', property], 0], 0,
              0,
            ],
          ],
          'fill-outline-color': [
            'rgba',
            0,
            0,
            0,
            0.1,	
          ],
        },
      }, beforeId);
      layers[id] = true;
      layerMetadata[id] = metadata
      legends[id] = getLegend(intervals, colors);
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

  const hideLayer = (map, id) => {
    if (id in layers && map) {
      map.setLayoutProperty(id, 'visibility', 'none');
    }
  };

  return {
    state: layers,
    add: addLayer,
    hide: hideLayer,
    show: showLayer,
    current,
    legend: legends[current] || [],
    metadata: layerMetadata[current] || {},
  };
};
export default useLayerCreate;
