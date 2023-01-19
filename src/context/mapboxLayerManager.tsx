import React, { memo, useCallback, useContext, useState } from 'react';
import { NUMBER_OF_SCALES } from 'src/constants';
import {
  getScales,
  getColor,
  generateLegendScales,
  convertToGeoJSON,
} from 'src/utils';
import type { Feature, FeatureCollection, Polygon } from 'geojson';
import { Legend, MapMouseEvent } from 'src/types';
import { useMap } from 'src/context/map';
import popup from 'src/utils/popup';
import chroma from 'chroma-js';
import { scaleQuantile } from 'd3-scale';

interface AddOptions {
  legendTitle: string;
  id: string;
  features: Feature<Polygon>[];
  property: string;
  values: number[];
  visible: boolean;
  unit?: string;
  beforeId?: string;
  numberOfScales?: number;
  maxValue: number;
  scaleColors?: [string, string];
  opacity?: number;
  customScales?: number[];
  customLegend?: Legend;
  scaleFormula?: 'quantile' | 'linear' | 'none';
}

interface ShowOptions {
  reset?: boolean;
}

interface MapboxLayerManagerParams {
  current?: string | undefined;
  geojson?: FeatureCollection<Polygon>;
  legend?: Legend;
  add: (options: AddOptions) => void;
  hideAll: () => void;
  show: (id?: string, options?: ShowOptions) => void;
}

interface MapboxLayerManagerProps {
  children: React.ReactNode;
}

const initialState = {
  current: undefined,
  geojson: undefined,
  legend: undefined,
  add: () => undefined,
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

  const unregisterAllMouseListeners = useCallback(() => {
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
      values,
      visible,
      unit,
      beforeId,
      numberOfScales = NUMBER_OF_SCALES,
      scaleColors = ['#f8dda1', '#f1bb43'],
      customScales,
      maxValue,
      opacity = 0.5,
      customLegend,
      scaleFormula,
    }: AddOptions) => {
      if (map && !(id in state) && !map.getSource(id)) {
        const [startColor, endColor] = scaleColors;
        const numberOfColors = customScales?.length ?? numberOfScales;
        const colors = chroma
          .scale([startColor, endColor])
          .mode('lab')
          .gamma(0.5)
          .colors(numberOfColors);
        const colorsValues = Array.from(Array(colors.length).keys());

        const sortedArray = values.sort((a, b) => a - b);
        const quantileScales = scaleQuantile(sortedArray, colorsValues);

        let scales = getScales(maxValue, numberOfScales);

        if (scaleFormula === 'quantile') {
          scales = colorsValues.map((color) =>
            Math.round(quantileScales.invertExtent(color)[1])
          );
        }

        if (customScales?.length) {
          scales = customScales;
        }

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
              'fill-color':
                scaleFormula === 'none'
                  ? startColor
                  : getColor(property, scales, colors),
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
          scales: generateLegendScales({
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
    unregisterAllMouseListeners();

    Object.keys(state).forEach((layerId) => {
      map.setLayoutProperty(layerId, 'visibility', 'none');
    });

    setCurrent(undefined);
  }, [map, unregisterAllMouseListeners]);

  const show = useCallback(
    (id?: string, options: ShowOptions = { reset: true }) => {
      if (id && id in state && map && map.getSource(id)) {
        if (options.reset) {
          hideAll();
        }

        registerMouseListeners(id);
        map.setLayoutProperty(id, 'visibility', 'visible');
        setCurrent(id);
      } else {
        console.warn(
          "Couldn't show layer because missing ID or source not found"
        );
      }
    },
    [hideAll, map, registerMouseListeners]
  );

  return (
    <MapboxLayerManagerContext.Provider
      value={{
        current,
        geojson: current ? geojson[current] : undefined,
        legend: current ? legends[current] : undefined,
        add,
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
