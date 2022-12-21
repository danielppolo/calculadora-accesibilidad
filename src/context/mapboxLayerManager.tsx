import React, { memo, useCallback, useContext, useState } from 'react';
import { NUMBER_OF_BUCKETS } from 'src/constants';
import { getIntervals, getColor, getLegend, convertToGeoJSON } from 'src/utils';
import type { Feature, FeatureCollection, Polygon } from 'geojson';
import { Legend, MapMouseEvent } from 'src/types';
import { useMap } from 'src/context/map';
import popup from 'src/utils/popup';
import Gradient from 'javascript-color-gradient';
import chroma from 'chroma-js';
// import summary from 'summary';
// import { quantile } from 'simple-statistics';
import { scaleThreshold, scaleQuantile } from 'd3-scale';

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

const state: Record<string, boolean> = {};
const legends: Record<string, Legend> = {};
const geojson: Record<string, FeatureCollection<Polygon>> = {};

function MapboxLayerManagerProvider({ children }: MapboxLayerManagerProps) {
  const map = useMap();
  const [current, setCurrent] = useState<string | undefined>(undefined);

  const handleMouseEnter = useCallback(
    (event: MapMouseEvent) => {
      popup
        .setLngLat(event.lngLat)
        .setHTML(`${event?.features?.[0]?.properties?.description}`)
        .addTo(map);
    },
    [map]
  );

  const handleMouseMove = useCallback((event: MapMouseEvent) => {
    popup
      .setLngLat(event.lngLat)
      .setHTML(`${event?.features?.[0]?.properties?.description}`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    popup.remove();
  }, []);

  const unregisterMouseListeners = useCallback(() => {
    Object.keys(state).forEach((id) => {
      map.off('mouseenter', id, handleMouseEnter);
      map.off('mousemove', id, handleMouseMove);
      map.off('mouseleave', id, handleMouseLeave);
    });
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove, map]);

  const registerMouseListeners = useCallback(
    (id: string) => {
      map.on('mouseenter', id, handleMouseEnter);
      map.on('mousemove', id, handleMouseMove);
      map.on('mouseleave', id, handleMouseLeave);
    },
    [handleMouseEnter, handleMouseLeave, handleMouseMove, map]
  );

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
      if (map && !(id in state) && !map.getSource(id)) {
        const [startColor, endColor] = colors;

        // FIXME: Experimental
        // const colorGradient = chroma
        //   .scale([startColor, endColor])
        //   .mode('lab')
        //   .gamma(0.5)
        //   .colors(10);
        // const sortedArray = arrayOfTotals.sort((a, b) => a - b);
        // const treshold = scaleThreshold()
        //   .domain(sortedArray)
        //   .range(colorGradient);
        // const quantile = scaleQuantile()
        //   .domain(sortedArray)
        //   .range(colorGradient);

        // Get color intervals
        const intervals = getIntervals(maxValue, stepSize);
        const reversedIntervals = [...intervals].reverse();
        const colorGradient = new Gradient()
          .setColorGradient(startColor, endColor)
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
                ? startColor
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
          title: unit ? `${legendTitle} (${unit})` : legendTitle,
          intervals: getLegend(intervals, legendColorIntervals),
        };

        if (visible) {
          setCurrent(id);
        }
      }
    },
    [map]
  );

  const hideAll = useCallback(() => {
    if (map) {
      Object.keys(state).forEach((layerId) => {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      });
    } else {
      // TODO: Sentry
    }
  }, [map]);

  const show = useCallback(
    (id?: string) => {
      if (id && id in state && map && map.getSource(id)) {
        hideAll();
        unregisterMouseListeners();
        registerMouseListeners(id);

        map.setLayoutProperty(id, 'visibility', 'visible');
        setCurrent(id);
      } else {
        // TODO: Sentry
      }
    },
    [hideAll, map, registerMouseListeners, unregisterMouseListeners]
  );

  const hide = useCallback(
    (id?: string) => {
      if (id && map && id in state && map.getSource(id)) {
        map.setLayoutProperty(id, 'visibility', 'none');
      } else {
        // TODO: Sentry
      }
    },
    [map]
  );

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

export default memo(MapboxLayerManagerProvider);
