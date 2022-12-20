import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useContext, useState } from 'react';
import { MEXICO_COORDINATES } from 'src/constants';
import useConfig from 'src/hooks/data/useConfig';
import useCurrentVariant from 'src/hooks/data/useCurrentVariant';
import { MapParamsState } from 'src/types';
import { generateVariantId } from 'src/utils';
import queries from 'src/utils/queries';
import { message } from 'antd';
import { useMap } from './map';
import { useMapboxLayerManager } from './mapboxLayerManager';

interface ResetOptions {
  flyToOrigin?: boolean;
}
interface MapParamsContext {
  current: MapParamsState;
  onVariantChange: (
    cityCode: string,
    visualizationCode: string,
    variantCode: string
  ) => void;
  onVisualizationChange: (cityCode: string, visualizationCode: string) => void;
  onCityChange: (cityCode: string) => void;
  onHexagonChange: (featureId: string) => void;
  onFiltersChange: (
    filters: Record<string, string>,
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

function MapParamsProvider({ children }: MapParamsProviderProps) {
  const map = useMap();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { data: config } = useConfig();
  const [current, setCurrent] = useState<MapParamsState>({});
  const { show, hideAll } = useMapboxLayerManager();
  const getCurrentVariant = useCurrentVariant();

  const handleVariantChange = useCallback(
    (cityCode: string, visualizationCode: string, variantCode: string) => {
      const visualization = config?.[cityCode].visualizations.find(
        (viz) => viz.code === visualizationCode
      );
      const gridCode = visualization?.grid?.code;

      setCurrent((state) => {
        const nextState = {
          cityCode,
          gridCode,
          visualizationCode,
          variantCode,
        };

        const { queryKey } = queries.visualizationVariants.detail({
          cityCode,
          visualizationCode,
          variantCode,
        });
        const isDataCached = queryClient.getQueryCache().find(queryKey);

        if (isDataCached) {
          // Show the cached data
          const defaultVariantFilters: Record<string, string> = {};
          visualization?.filters.forEach((filter) => {
            defaultVariantFilters[filter.code] = filter.defaultProperty.code;
          });

          const id = generateVariantId({
            cityCode,
            gridCode,
            visualizationCode,
            variantCode,
            filters: defaultVariantFilters,
          });
          show(id);
        }

        const nextVariant = getCurrentVariant(nextState);
        if (nextVariant?.relative === 'hexagon') {
          hideAll();
          messageApi.info({
            content: 'Da click en un hexágono para comenzar',
            duration: 0,
            key: 'isochrone',
          });
        } else {
          messageApi.destroy('isochrone');
        }

        return nextState;
      });
    },
    [config, getCurrentVariant, hideAll, messageApi, queryClient, show]
  );

  const handleVisualizationChange = useCallback(
    (cityCode: string, visualizationCode: string) => {
      const visualization = config?.[cityCode].visualizations.find(
        (viz) => viz.code === visualizationCode
      );
      const defaultVariantCode = visualization?.defaultVariant?.code;
      const gridCode = visualization?.grid?.code;

      if (defaultVariantCode) {
        return handleVariantChange(
          cityCode,
          visualizationCode,
          defaultVariantCode
        );
      }

      return setCurrent((state) => ({
        ...state,
        cityCode,
        visualizationCode,
        gridCode,
      }));
    },
    [config, handleVariantChange]
  );

  const handleReset = useCallback(
    (options?: ResetOptions) => {
      messageApi.destroy();

      if (options?.flyToOrigin) {
        map.flyTo({
          center: MEXICO_COORDINATES,
          zoom: 4.5,
          duration: 2000,
        });
      }

      hideAll();
      return setCurrent(initialContext.current);
    },
    [hideAll, map, messageApi]
  );

  const handleCityChange = useCallback(
    (cityCode?: string) => {
      if (cityCode === current.cityCode) {
        return undefined;
      }

      if (cityCode) {
        map.flyTo({
          center: config?.[cityCode]?.coordinates,
          zoom: 11,
          duration: 2000,
        });

        const defaultVisualization = config?.[cityCode]?.defaultVisualization;

        if (defaultVisualization) {
          return handleVisualizationChange(cityCode, defaultVisualization.code);
        }

        return setCurrent((state) => ({ ...state, cityCode }));
      }
      return handleReset({ flyToOrigin: true });
    },
    [current.cityCode, handleReset, map, config, handleVisualizationChange]
  );

  const handleHexagonChange = useCallback(
    (featureId: string) => {
      return setCurrent((state) => {
        messageApi.destroy('isochrone');

        const { queryKey } = queries.visualizationVariants.hexagon({
          cityCode: state.cityCode,
          visualizationCode: state.visualizationCode,
          variantCode: state.variantCode,
          featureId,
        });
        const isDataCached = queryClient.getQueryCache().find(queryKey);

        if (isDataCached) {
          // Show the cached data
          const id = generateVariantId({
            ...current,
            featureId,
          });
          show(id);
        }

        return {
          ...state,
          featureId,
        };
      });
    },
    [current, messageApi, queryClient, show]
  );

  const handleFiltersChange = useCallback(
    (filters: Record<string, string>, method: 'merge' | 'reset') => {
      return setCurrent((state) => {
        const nextFilters =
          method === 'reset'
            ? filters
            : {
                ...state.filters,
                ...filters,
              };

        const id = generateVariantId({
          ...state,
          filters: nextFilters,
        });

        show(id);

        return {
          ...state,
          filters: nextFilters,
        };
      });
    },
    [show]
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

export default MapParamsProvider;
