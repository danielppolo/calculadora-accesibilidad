import React, { useCallback, useContext, useState } from 'react';
import { MEXICO_COORDINATES } from 'src/constants';
import useConfig from 'src/hooks/data/useConfig';
import { MapParamsState } from 'src/types';
import { generateVariantId } from 'src/utils';
import { useMap } from './map';
import { useMapboxLayerManager } from './mapboxLayerManager';

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
  onReset: () => void;
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
  const { data: config } = useConfig();
  const [current, setCurrent] = useState<MapParamsState>({});
  const { show, hideAll } = useMapboxLayerManager();

  const handleVariantChange = useCallback(
    (cityCode: string, visualizationCode: string, variantCode: string) => {
      const visualization = config?.[cityCode].visualizations.find(
        (viz) => viz.code === visualizationCode
      );
      const gridCode = visualization?.grid?.code;

      if (gridCode) {
        setCurrent({
          cityCode,
          gridCode,
          visualizationCode,
          variantCode,
        });
      } else {
        // TODO:
      }
    },
    [config]
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

  const handleCityChange = useCallback(
    (cityCode?: string) => {
      if (cityCode) {
        map.flyTo({
          center: config?.[cityCode]?.coordinates,
          zoom: 11,
          duration: 2000,
          offset: [100, 50],
        });

        const defaultVisualization = config?.[cityCode]?.defaultVisualization;

        if (defaultVisualization) {
          return handleVisualizationChange(cityCode, defaultVisualization.code);
        }
      }

      return setCurrent((state) => ({ ...state, cityCode }));
    },
    [config, handleVisualizationChange, map]
  );

  const handleHexagonChange = useCallback((featureId: string) => {
    return setCurrent((state) => ({
      ...state,
      featureId,
    }));
  }, []);

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

  const handleReset = () => {
    map.flyTo({
      // TODO: Set coordinates in Mapbox
      center: MEXICO_COORDINATES,
      zoom: 4.5,
      duration: 2000,
    });
    hideAll();
    return setCurrent(initialContext.current);
  };

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
      {children}
    </MapParamsContext.Provider>
  );
}

/**
 * Map is present because provider does not render children until map is loaded.
 */
export const useMapParams = () => useContext(MapParamsContext);

export default MapParamsProvider;
