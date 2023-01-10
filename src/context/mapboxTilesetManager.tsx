import React, { memo, useCallback, useContext, useState } from 'react';
import { MAX_ZOOM, ZOOM_THRESHOLD } from 'src/constants';
import { useMap } from 'src/context/map';
import { Legend, MapboxTileset } from 'src/types';

interface MapboxTilesetManagerParams {
  state?: Record<string, boolean>;
  legends?: Record<string, Legend>;
  add: (tileset: MapboxTileset, visibility?: 'visible' | 'none') => void;
  show: (tileset: MapboxTileset) => void;
  hide: (tileset: MapboxTileset) => void;
  toggle: (tileset: MapboxTileset) => void;
  hideAll: () => void;
}

interface MapboxTilesetManagerProps {
  children: React.ReactNode;
}

const initialState = {
  state: undefined,
  legends: undefined,
  add: () => undefined,
  show: () => undefined,
  hide: () => undefined,
  hideAll: () => undefined,
  toggle: () => undefined,
};

const MapboxTilesetManagerContext =
  React.createContext<MapboxTilesetManagerParams>(initialState);

type ID = string;
type Active = boolean;

const legends: Record<string, Legend> = {};

function MapboxTilesetManagerProvider({ children }: MapboxTilesetManagerProps) {
  const map = useMap();
  const [state, setState] = useState<Record<ID, Active>>({});

  const add = useCallback(
    (
      {
        tilesetId,
        type,
        name,
        sourceLayer,
        fillColorExpression,
        fillOpacity = 1,
        lineColorExpression = '#000',
        lineOpacity = 1,
        lineWidth = 1,
        legendRanges,
      }: MapboxTileset,
      visibility: 'none' | 'visible' = 'none'
    ) => {
      if (map && !(sourceLayer in state) && !map.getSource(sourceLayer)) {
        map.addSource(sourceLayer, {
          type: 'vector',
          url: `mapbox://${tilesetId}`,
          minzoom: ZOOM_THRESHOLD,
          maxzoom: MAX_ZOOM,
        });

        if (type === 'fill') {
          map.addLayer({
            id: sourceLayer,
            type: 'fill',
            source: sourceLayer,
            'source-layer': sourceLayer,
            layout: { visibility },
            paint: {
              'fill-color': fillColorExpression,
              'fill-opacity': fillOpacity,
            },
          });
        }

        if (type === 'line') {
          map.addLayer({
            id: sourceLayer,
            type: 'line',
            source: sourceLayer,
            'source-layer': sourceLayer,
            layout: { visibility },
            paint: {
              'line-color': lineColorExpression,
              'line-opacity': lineOpacity,
              'line-width': lineWidth,
            },
          });
        }

        legends[sourceLayer] = {
          title: name,
          intervals: legendRanges ?? [],
        };

        setState((prevState) => ({
          ...prevState,
          [sourceLayer]: visibility === 'visible',
        }));
      }
    },
    [map, state]
  );

  const hideAll = useCallback(() => {
    if (map) {
      Object.keys(state).forEach((sourceLayer) => {
        map.setLayoutProperty(sourceLayer, 'visibility', 'none');
        setState((prevState) => ({
          ...prevState,
          [sourceLayer]: false,
        }));
      });
    }
  }, [map, state]);

  const show = useCallback(
    (tileset: MapboxTileset) => {
      const { sourceLayer } = tileset;
      if (map?.getSource(sourceLayer)) {
        map.setLayoutProperty(sourceLayer, 'visibility', 'visible');
        setState((prevState) => ({
          ...prevState,
          [sourceLayer]: true,
        }));
      } else {
        add(tileset, 'visible');
      }
    },
    [add, map]
  );

  const hide = useCallback(
    (tileset: MapboxTileset) => {
      const { sourceLayer } = tileset;

      if (map?.getSource(sourceLayer)) {
        map.setLayoutProperty(sourceLayer, 'visibility', 'none');
        setState((prevState) => ({
          ...prevState,
          [sourceLayer]: false,
        }));
      } else {
        add(tileset, 'none');
      }
    },
    [add, map]
  );

  const toggle = useCallback(
    (tileset: MapboxTileset) => {
      const { sourceLayer } = tileset;

      if (sourceLayer in state && map?.getSource(sourceLayer)) {
        if (map.getLayoutProperty(sourceLayer, 'visibility') === 'visible') {
          map.setLayoutProperty(sourceLayer, 'visibility', 'none');
          setState((prevState) => ({
            ...prevState,
            [sourceLayer]: false,
          }));
        } else {
          map.setLayoutProperty(sourceLayer, 'visibility', 'visible');
          setState((prevState) => ({
            ...prevState,
            [sourceLayer]: true,
          }));
        }
      } else {
        add(tileset, 'visible');
      }
    },
    [add, map, state]
  );

  return (
    <MapboxTilesetManagerContext.Provider
      value={{
        state,
        legends,
        add,
        show,
        hide,
        hideAll,
        toggle,
      }}
    >
      {children}
    </MapboxTilesetManagerContext.Provider>
  );
}

export const useMapboxTilesetManager = () =>
  useContext(MapboxTilesetManagerContext);

export default memo(MapboxTilesetManagerProvider);
