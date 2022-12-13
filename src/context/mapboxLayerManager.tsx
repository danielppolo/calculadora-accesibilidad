import React, { useCallback, useContext, useState } from 'react';
import Gradient from 'javascript-color-gradient';
import { NUMBER_OF_BUCKETS } from 'src/constants';
import { getIntervals, getColor, getLegend, convertToGeoJSON } from 'src/utils';
import { Feature, FeatureCollection, Polygon } from 'geojson';
import { Legend } from 'src/types';
import { useMap } from 'src/context/map';

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

interface MapboxLayerManagerParams {
  state?: Record<string, boolean>;
  current?: string | undefined;
  geojson?: FeatureCollection<Polygon>;
  legend?: Legend;
  add: (options: AddOptions) => void;
  hide: (id?: string) => void;
  hideAll: () => void;
  show: (id?: string) => void;
}

interface MapboxLayerManagerProps {
  children: React.ReactNode;
}

const initialState = {
  current: undefined,
  state: undefined,
  geojson: undefined,
  legend: undefined,
  add: () => undefined,
  hide: () => undefined,
  hideAll: () => undefined,
  show: () => undefined,
};

const MapboxLayerManagerContext =
  React.createContext<MapboxLayerManagerParams>(initialState);

function MapboxLayerManagerProvider({ children }: MapboxLayerManagerProps) {
  const map = useMap();
  const [state] = useState<Record<string, boolean>>({});
  const [legends] = useState<Record<string, Legend>>({});
  const [geojson] = useState<Record<string, FeatureCollection<Polygon>>>({});
  const [current, setCurrent] = useState<string | undefined>(undefined);

  const add = useCallback(
    ({
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
    },
    [geojson, legends, map, state]
  );

  const show = useCallback(
    (id?: string) => {
      if (id && id in state && map) {
        map.setLayoutProperty(id, 'visibility', 'visible');
        setCurrent(id);
      }
    },
    [map, state]
  );

  const hide = useCallback(
    (id?: string) => {
      if (id && map && id in state) {
        map.setLayoutProperty(id, 'visibility', 'none');
      }
    },
    [map, state]
  );

  const hideAll = useCallback(() => {
    if (map) {
      Object.keys(state).forEach((layerId) => {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      });
    }
  }, [map, state]);

  return (
    <MapboxLayerManagerContext.Provider
      value={{
        current,
        state,
        geojson: current ? geojson[current] : undefined,
        legend: current ? legends[current] : undefined,
        add,
        hide,
        hideAll,
        show,
      }}
    >
      {children}
    </MapboxLayerManagerContext.Provider>
  );
}

export const useMapboxLayerManager = () =>
  useContext(MapboxLayerManagerContext);

export default MapboxLayerManagerProvider;
