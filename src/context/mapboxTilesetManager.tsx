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
        id,
        type,
        name,
        sourceLayer,
        fillColorExpression = ['rgb', 0, 0, 0],
        fillOpacity = 1,
        lineColorExpression = ['rgb', 0, 0, 0],
        lineOpacity = 1,
        lineWidth = 1,
        legendRanges,
      }: MapboxTileset,
      visibility: 'none' | 'visible' = 'none'
    ) => {
      if (map && !(id in state) && !map.getSource(id)) {
        map.addSource(id, {
          type: 'vector',
          url: `mapbox://${id}`,
          minzoom: ZOOM_THRESHOLD,
          maxzoom: MAX_ZOOM,
        });

        if (type === 'fill') {
          map.addLayer({
            id,
            type: 'fill',
            source: id,
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
            id,
            type: 'line',
            source: id,
            'source-layer': sourceLayer,
            layout: { visibility },
            paint: {
              'line-color': lineColorExpression,
              'line-opacity': lineOpacity,
              'line-width': lineWidth,
            },
          });
        }

        legends[id] = {
          title: name,
          scales: legendRanges ?? [],
        };

        setState((prevState) => ({
          ...prevState,
          [id]: visibility === 'visible',
        }));
      }
    },
    [map, state]
  );

  const hideAll = useCallback(() => {
    if (map) {
      setState((prevState) => {
        const nextState = {
          ...prevState,
        };

        Object.keys(state).forEach((id) => {
          map.setLayoutProperty(id, 'visibility', 'none');
          nextState[id] = false;
        });

        return nextState;
      });
    }
  }, [map, state]);

  const show = useCallback(
    (tileset: MapboxTileset) => {
      const { id } = tileset;
      const isLayerPresent = map?.getSource(id);

      if (isLayerPresent) {
        map.setLayoutProperty(id, 'visibility', 'visible');
        setState((prevState) => ({
          ...prevState,
          [id]: true,
        }));
      } else {
        add(tileset, 'visible');
      }
    },
    [add, map]
  );

  const hide = useCallback(
    (tileset: MapboxTileset) => {
      const { id } = tileset;
      const isLayerPresent = map?.getSource(id);

      if (isLayerPresent) {
        map.setLayoutProperty(id, 'visibility', 'none');
        setState((prevState) => ({
          ...prevState,
          [id]: false,
        }));
      } else {
        add(tileset, 'none');
      }
    },
    [add, map]
  );

  const toggle = useCallback(
    (tileset: MapboxTileset) => {
      const { id } = tileset;
      const isLayerPresent = map?.getSource(id);

      if (isLayerPresent) {
        const isVisible = map.getLayoutProperty(id, 'visibility') === 'visible';

        if (isVisible) {
          map.setLayoutProperty(id, 'visibility', 'none');
          setState((prevState) => ({
            ...prevState,
            [id]: false,
          }));
        } else {
          map.setLayoutProperty(id, 'visibility', 'visible');
          setState((prevState) => ({
            ...prevState,
            [id]: true,
          }));
        }
      } else {
        add(tileset, 'visible');
      }
    },
    [add, map]
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
