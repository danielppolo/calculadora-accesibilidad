import { useQueryClient } from '@tanstack/react-query';
import React, { memo, useCallback, useContext, useState } from 'react';
import {
  CITIES_ZONES_FILL_LAYER_ID,
  CITY_ZOOM,
  COUNTRY_ZOOM,
  MEXICO_COORDINATES,
} from 'src/constants';
import useConfig from 'src/hooks/data/useConfig';
import { MapParamsState } from 'src/types';
import { generateVariantId } from 'src/utils';
import queries from 'src/utils/queries';
import { message } from 'antd';
import getDefaultVisualizationFilters from 'src/utils/getDefaultVisualizationFilters';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import getComparableFilter from 'src/utils/getComparableFilter';
import isComparable from 'src/utils/isComparable';
import { useMap } from './map';
import { useMapboxLayerManager } from './mapboxLayerManager';
import { useMapboxTilesetManager } from './mapboxTilesetManager';

interface ResetOptions {
  flyToOrigin?: boolean;
}

interface OnVisualizationChangeParams {
  cityCode: MapParamsState['cityCode'];
  visualizationCode: MapParamsState['visualizationCode'];
}

interface OnVariantChangeParams {
  cityCode: MapParamsState['cityCode'];
  visualizationCode: MapParamsState['visualizationCode'];
  variantCode: MapParamsState['variantCode'];
}

interface MapParamsContext {
  current: Partial<MapParamsState>;
  onVariantChange: (params: OnVariantChangeParams) => void;
  onVisualizationChange: (params: OnVisualizationChangeParams) => void;
  onCityChange: (cityCode: MapParamsState['cityCode']) => void;
  onHexagonChange: (featureId: MapParamsState['featureId']) => void;
  onFiltersChange: (
    filters: MapParamsState['filters'],
    method: 'merge' | 'reset'
  ) => void;
  onReset: (options?: ResetOptions) => void;
}

const initialContext = {
  current: {},
  onVariantChange: () => undefined,
  onVisualizationChange: () => undefined,
  onCityChange: () => undefined,
  onHexagonChange: () => undefined,
  onFiltersChange: () => undefined,
  onReset: () => undefined,
};

const MapParamsContext = React.createContext<MapParamsContext>(initialContext);

interface MapParamsProviderProps {
  children: React.ReactNode;
}

// Use this handle the state read within useCallback.
let nonReactiveCurrent: Partial<MapParamsState> = {};

function MapParamsProvider({ children }: MapParamsProviderProps) {
  const map = useMap();
  const queryClient = useQueryClient();
  const { data: config } = useConfig();
  const [messageApi, contextHolder] = message.useMessage();
  const getCurrentVisualization = useCurrentVisualization();
  const [current, setCurrent] = useState<Partial<MapParamsState>>({});
  const { show, hideAll } = useMapboxLayerManager();
  const {
    show: showTileset,
    hide: hideTileset,
    hideAll: hideAllTilesets,
  } = useMapboxTilesetManager();

  const handleVariantChange = useCallback(
    ({ cityCode, visualizationCode, variantCode }: OnVariantChangeParams) => {
      const visualization = getCurrentVisualization({
        cityCode,
        visualizationCode,
      });
      const gridCode = visualization?.grid?.code;

      const nextState = {
        cityCode,
        gridCode,
        visualizationCode,
        variantCode,
      };

      // Show the cached data
      const { queryKey } = queries.visualizationVariants.detail({
        cityCode,
        visualizationCode,
        variantCode,
      });
      const isDataCached = !!queryClient.getQueryCache().find(queryKey);

      if (isDataCached) {
        const defaultFilters = getDefaultVisualizationFilters(visualization);

        const id = generateVariantId({
          cityCode,
          gridCode,
          visualizationCode,
          variantCode,
          filters: defaultFilters,
        });
        show(id);
      }

      // Display alert if requires feature selection
      if (visualization?.relativeTo === 'feature') {
        hideAll();
        messageApi.info({
          content: 'Da click en un hexágono para comenzar',
          duration: 0,
          key: 'isochrone',
        });
      } else {
        messageApi.destroy('isochrone');
      }

      nonReactiveCurrent = { ...nextState };
      setCurrent(nextState);
    },
    [getCurrentVisualization, hideAll, messageApi, queryClient, show]
  );

  const handleVisualizationChange = useCallback(
    ({ cityCode, visualizationCode }: OnVisualizationChangeParams) => {
      const visualization = getCurrentVisualization({
        cityCode,
        visualizationCode,
      });
      const defaultVariantCode = visualization?.defaultVariant?.code;
      const gridCode = visualization?.grid?.code;

      if (defaultVariantCode) {
        return handleVariantChange({
          cityCode,
          visualizationCode,
          variantCode: defaultVariantCode,
        });
      }

      return setCurrent((state) => {
        const nextState = {
          ...state,
          cityCode,
          visualizationCode,
          gridCode,
        };
        nonReactiveCurrent = { ...nextState };
        return nextState;
      });
    },
    [getCurrentVisualization, handleVariantChange]
  );

  const handleReset = useCallback(
    (options?: ResetOptions) => {
      messageApi.destroy();

      // Repaint city zones
      if (map.getLayer(CITIES_ZONES_FILL_LAYER_ID)) {
        map.setPaintProperty(CITIES_ZONES_FILL_LAYER_ID, 'fill-opacity', 0.5);
      }

      if (options?.flyToOrigin) {
        map.flyTo({
          center: MEXICO_COORDINATES,
          zoom: COUNTRY_ZOOM,
          duration: 2000,
        });
      }

      // Remove all active layers.
      hideAll();
      hideAllTilesets();

      const nextState = { ...initialContext.current };
      nonReactiveCurrent = nextState;
      return setCurrent(nextState);
    },
    [hideAll, hideAllTilesets, map, messageApi]
  );

  const handleCityChange = useCallback(
    (cityCode?: MapParamsState['cityCode']) => {
      if (cityCode === nonReactiveCurrent.cityCode) {
        return undefined;
      }

      if (cityCode) {
        if (map.getLayer(CITIES_ZONES_FILL_LAYER_ID)) {
          map.setPaintProperty(CITIES_ZONES_FILL_LAYER_ID, 'fill-opacity', 0);
        }

        map.flyTo({
          center: config?.citiesDictionary?.[cityCode]?.coordinates,
          zoom: CITY_ZOOM,
          duration: 2000,
        });

        const defaultVisualization =
          config?.citiesDictionary?.[cityCode]?.defaultVisualization;

        if (defaultVisualization) {
          return handleVisualizationChange({
            cityCode,
            visualizationCode: defaultVisualization.code,
          });
        }

        return setCurrent((state) => {
          const nextState = { ...state, cityCode };
          nonReactiveCurrent = { ...nextState };
          return nextState;
        });
      }

      return handleReset({ flyToOrigin: true });
    },
    [map, handleReset, config?.citiesDictionary, handleVisualizationChange]
  );

  const handleHexagonChange = useCallback(
    (featureId: MapParamsState['featureId']) => {
      return setCurrent((state) => {
        messageApi.destroy('isochrone');

        // Show the cached data
        const { queryKey } = queries.visualizationVariants.feature({
          cityCode: state.cityCode,
          visualizationCode: state.visualizationCode,
          variantCode: state.variantCode,
          featureId,
        });
        const isDataCached = !!queryClient.getQueryCache().find(queryKey);

        if (isDataCached) {
          const id = generateVariantId({
            ...current,
            featureId,
          });
          show(id);
        }

        const nextState = {
          ...state,
          featureId,
        };

        nonReactiveCurrent = { ...nextState };
        return nextState;
      });
    },
    [current, messageApi, queryClient, show]
  );

  const handleFiltersChange = useCallback(
    (filters: MapParamsState['filters'], method: 'merge' | 'reset') => {
      return setCurrent((state) => {
        // Display Tilesets based on filterss
        const visualization = getCurrentVisualization({
          cityCode: state.cityCode,
          visualizationCode: state.visualizationCode,
        });

        Object.entries(filters).forEach(([filterCode, propertyCode]) => {
          const currentFilter = visualization?.filters?.find(
            (filter) => filter.code === filterCode
          );
          currentFilter?.options.forEach((option) => {
            if (option.code === propertyCode) {
              option.enabledMapboxTilesets?.forEach((tileset) => {
                showTileset(tileset);
              });
            } else {
              option.enabledMapboxTilesets?.forEach((tileset) => {
                hideTileset(tileset);
              });
            }
          });
        });

        const nextFilters =
          method === 'reset'
            ? filters
            : {
                ...state.filters,
                ...filters,
              };

        // Render active layers
        const comparableFilter = getComparableFilter(visualization);
        const comparableValues =
          comparableFilter?.code && nextFilters[comparableFilter.code];

        if (
          isComparable(visualization) &&
          comparableFilter &&
          Array.isArray(comparableValues)
        ) {
          hideAll();

          if (comparableValues.length > 0) {
            comparableValues.forEach((comparableValue) => {
              const id = generateVariantId({
                ...state,
                filters: {
                  ...nextFilters,
                  [comparableFilter.code]: comparableValue,
                },
              });
              show(id, { reset: false });
            });
          }
        } else {
          const id = generateVariantId({
            ...state,
            filters: nextFilters,
          });
          show(id);
        }

        const nextState = {
          ...state,
          filters: nextFilters,
        };

        nonReactiveCurrent = { ...nextState };

        return nextState;
      });
    },
    [getCurrentVisualization, hideAll, hideTileset, show, showTileset]
  );

  return (
    <MapParamsContext.Provider
      value={{
        current,
        onVariantChange: handleVariantChange,
        onVisualizationChange: handleVisualizationChange,
        onCityChange: handleCityChange,
        onHexagonChange: handleHexagonChange,
        onFiltersChange: handleFiltersChange,
        onReset: handleReset,
      }}
    >
      {contextHolder}
      {children}
    </MapParamsContext.Provider>
  );
}

/**
 * Map is present because provider does not render children until map is loaded.
 */
export const useMapParams = () => useContext(MapParamsContext);

export default memo(MapParamsProvider);
