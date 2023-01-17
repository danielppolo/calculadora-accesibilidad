import React, { memo, useCallback, useContext, useState } from 'react';
import { NUMBER_OF_SCALES } from 'src/constants';
import {
  getScales,
  getColor,
  getLegendScales,
  convertToGeoJSON,
} from 'src/utils';
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
  numberOfScales?: number;
  reverseColors?: boolean;
  scaleColors?: [string, string];
  opacity?: number;
  solid?: boolean;
  customScales?: number[];
  customLegend?: Legend;
}

interface ShowOptions {
  reset?: boolean;
}

interface MapboxLayerManagerParams {
  state?: Record<string, boolean>;
  current?: string | undefined;
  geojson?: FeatureCollection<Polygon>;
  legend?: Legend;
  add: (options: AddOptions) => void;
  hide: (id?: string) => void;
  hideAll: () => void;
  show: (id?: string, options?: ShowOptions) => void;
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
      map
        .off('mouseenter', id, handleMouseEnter)
        .off('mousemove', id, handleMouseMove)
        .off('mouseleave', id, handleMouseLeave);
    });
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove, map]);

  const registerMouseListeners = useCallback(
    (id: string) => {
      map
        .on('mouseenter', id, handleMouseEnter)
        .on('mousemove', id, handleMouseMove)
        .on('mouseleave', id, handleMouseLeave);
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
      numberOfScales = NUMBER_OF_SCALES,
      reverseColors = false,
      scaleColors = ['#f8dda1', '#f1bb43'],
      customScales,
      opacity = 0.5,
      solid = false,
      customLegend,
    }: AddOptions) => {
      if (map && !(id in state) && !map.getSource(id)) {
        const [startColor, endColor] = scaleColors;

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

        // Get color scales
        const scales = customScales?.length
          ? customScales
          : getScales(maxValue, numberOfScales);
        const numberOfColors = customScales?.length ?? numberOfScales;
        const reversedIntervals = [...scales].reverse();
        const colorGradient = new Gradient()
          .setColorGradient(startColor, endColor)
          .setMidpoint(numberOfColors)
          .getColors();
        const colorIntervals = reverseColors
          ? [...colorGradient].reverse()
          : colorGradient;
        const colors = reverseColors
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
        legends[id] = customLegend ?? {
          title: legendTitle,
          scales: getLegendScales({
            scales,
            colors,
            opacity,
            unit,
          }),
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
      unregisterMouseListeners();

      Object.keys(state).forEach((layerId) => {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      });
      setCurrent(undefined);
    } else {
      // TODO: Sentry
    }
  }, [map, unregisterMouseListeners]);

  const show = useCallback(
    (id?: string, options?: ShowOptions) => {
      const { reset } = options || {};
      if (id && id in state && map && map.getSource(id)) {
        if (reset) {
          hideAll();
        }

        registerMouseListeners(id);
        map.setLayoutProperty(id, 'visibility', 'visible');
        setCurrent(id);
      } else {
        // TODO: Sentry
      }
    },
    [hideAll, map, registerMouseListeners]
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
