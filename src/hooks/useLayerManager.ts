import { useState } from 'react';
import Gradient from 'javascript-color-gradient';
import { NUMBER_OF_BUCKETS } from 'src/constants';
import { getIntervals, getColor, getLegend, convertToGeoJSON } from 'src/utils';
import { Map } from 'mapbox-gl';
import { Feature, FeatureCollection, Polygon } from 'geojson';
import { Legend } from 'src/types';
import useMap from './useMap';

interface AddOptions {
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

const useLayerManager = () => {
  const map = useMap();
  const [state] = useState<Record<string, boolean>>({});
  const [legends] = useState<Record<string, Legend>>({});
  const [geojson] = useState<Record<string, FeatureCollection<Polygon>>>({});
  const [current, setCurrent] = useState<string | undefined>(undefined);

  const add = ({
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
      const colorIntervals = reverseColors
        ? [...colorGradient].reverse()
        : colorGradient;
      const legendColorIntervals = reverseColors
        ? colorGradient
        : [...colorGradient].reverse();
      const geojsonFeatures = convertToGeoJSON(features);

      map.addSource(id, {
        type: 'geojson',
        data: geojsonFeatures,
      });

      map.addLayer(
        {
          id,
          type: 'fill',
          source: id,
          layout: {
            visibility: visible ? 'visible' : 'none',
          },
          // filter: ['>', ['get', property], 0],
          paint: {
            'fill-opacity': opacity,
            'fill-color': solid
              ? color1
              : getColor(property, reversedIntervals, colorIntervals),
            'fill-outline-color': [
              'case',
              ['has', 'selected'],
              ['rgba', 0, 0, 0, 1],
              ['rgba', 255, 0, 0, 0],
            ],
          },
        },
        beforeId
      );

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

  const show = (id?: string) => {
    if (id && id in state && map) {
      map.setLayoutProperty(id, 'visibility', 'visible');
      setCurrent(id);
    }
  };

  const hide = (id = undefined) => {
    if (id && map && id in state) {
      map.setLayoutProperty(id, 'visibility', 'none');
    }
  };

  const hideAll = () => {
    if (map) {
      Object.keys(state).forEach((layerId) => {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      });
    }
  };

  return {
    state,
    add,
    hide,
    hideAll,
    show,
    current,
    geojson: current ? geojson[current] : ({} as FeatureCollection<Polygon>),
    legend: current ? legends[current] : ({} as Legend),
  };
};
export default useLayerManager;
