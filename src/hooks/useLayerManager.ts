import { useState } from 'react';
import Gradient from 'javascript-color-gradient';
import { NUMBER_OF_BUCKETS } from '../constants';
import {
  getIntervals, getColor, getLegend, convertToGeoJSON,
} from '../utils';
import { Map } from 'mapbox-gl';
import { Feature, FeatureCollection, Polygon } from 'geojson';

interface AddOptions {
  map: Map;
  legendTitle: string;
  id: string;
  features: Feature<Polygon>[];
  property: string;
  maxValue: number;
  visible: boolean;
  unit?: string;
  beforeId?: string;
  stepSize?: number;
  reverseColors?: boolean;
  colors?: [string, string];
  opacity?: number;
  solid?: boolean;
}

type Legend = {
  title: string;
  intervals: {
    color: string;
    label: string;
  }[]
}

const useLayerManager = () => {
  const [state] = useState<Record<string, boolean>>({});
  const [legends] = useState<Record<string, Legend>>({});
  const [geojson] = useState<Record<string, FeatureCollection>>({});
  const [current, setCurrent] = useState<string | undefined>(undefined);

  const add = ({
    map,
    legendTitle,
    id,
    features,
    property,
    maxValue,
    visible,
    unit,
    beforeId,
    stepSize = NUMBER_OF_BUCKETS,
    reverseColors = false,
    colors = ['#f8dda1', '#f1bb43'],
    opacity = 0.5,
    solid = false,
  }: AddOptions) => {
    if (map && !(id in state)) {
      const [color1, color2] = colors;

      // Get color intervals
      const intervals = getIntervals(maxValue, stepSize);
      const reversedIntervals = [...intervals].reverse();
      const colorGradient = new Gradient()
        .setColorGradient(color1, color2)
        .setMidpoint(stepSize)
        .getColors();
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
      legends[id] = {
        title: legendTitle,
        intervals: getLegend(intervals, legendColorIntervals, unit),
      };

      if (visible) {
        setCurrent(id);
      }
    }
  };

  const show = (map: Map, id: string) => {
    if (id in state && map) {
      map.setLayoutProperty(id, 'visibility', 'visible');
      setCurrent(id);
    }
  };

  const hide = (map: Map, id = null) => {
    if (id && map && id in state) {
      map.setLayoutProperty(id, 'visibility', 'none');
    }
  };

  const hideAll = (map: Map) => {
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
    geojson: current ? geojson[current] : {} as Record<string, FeatureCollection>,
    legend: current ? legends[current] : [],
  };
};
export default useLayerManager;
