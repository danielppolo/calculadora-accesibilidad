import React, { useCallback, useContext, useState } from 'react';
import { MEXICO_COORDINATES } from 'src/constants';
import useConfig from 'src/hooks/data/useConfig';
import { generateVariantId } from 'src/utils';
import { useMap } from './map';
import { useMapboxLayerManager } from './mapboxLayerManager';

interface MapParamsState {
  gridCode?: string;
  cityCode?: string;
  visualizationCode?: string;
  variantCode?: string;
  hexagonId?: string;
  filters?: Record<string, string>;
}
interface MapParamsContext extends MapParamsState {
  onVariantChange?: (
    cityCode: string,
    visualizationCode: string,
    variantCode: string
  ) => void;
  onVisualizationChange?: (cityCode: string, visualizationCode: string) => void;
  onCityChange?: (cityCode?: string) => void;
  onHexagonChange?: (hexagonId: string) => void;
  onFiltersChange?: (filters: Record<string, string>) => void;
  onReset?: () => void;
}

const MapParamsContext = React.createContext<MapParamsContext>({});

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

  const handleHexagonChange = useCallback((hexagonId: string) => {
    console.log(hexagonId);
    return setCurrent((state) => ({
      ...state,
      hexagonId,
    }));
  }, []);

  const handleFiltersChange = useCallback(
    (filters: Record<string, string>) => {
      return setCurrent((state) => {
        const nextFilters = {
          ...state.filters,
          ...filters,
        };

        const id = generateVariantId({
          cityCode: state.cityCode,
          visualizationCode: state.visualizationCode,
          variantCode: state.variantCode,
          filters: nextFilters,
        });

        hideAll();
        show(id);

        return {
          ...state,
          filters: nextFilters,
        };
      });
    },
    [show, hideAll]
  );

  const handleReset = () => {
    map.flyTo({
      // TODO: Set coordinates in Mapbox
      center: MEXICO_COORDINATES,
      zoom: 4.5,
      duration: 2000,
    });
    hideAll();
    return setCurrent({
      cityCode: undefined,
      gridCode: undefined,
      visualizationCode: undefined,
      variantCode: undefined,
      hexagonId: undefined,
      filters: undefined,
    });
  };

  return (
    <MapParamsContext.Provider
      value={{
        ...current,
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
