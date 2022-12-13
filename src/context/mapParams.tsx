import React, { useCallback, useContext, useState } from 'react';
import useConfig from 'src/hooks/data/useConfig';
import { useMap } from './map';

interface MapParamsContext {
  gridCode?: string;
  cityCode?: string;
  visualizationCode?: string;
  variantCode?: string;
  hexagonId?: string;
  filters?: Record<string, string>;
  onVariantChange?: (
    cityCode: string,
    visualizationCode: string,
    variantCode: string
  ) => void;
  onVisualizationChange?: (cityCode: string, visualizationCode: string) => void;
  onCityChange?: (cityCode?: string) => void;
  onHexagonChange?: (hexagonId: string) => void;
  onFiltersChange?: (filters: Record<string, string>) => void;
}

const MapParamsContext = React.createContext<MapParamsContext>({});

interface MapParamsProviderProps {
  children: React.ReactNode;
}

function MapParamsProvider({ children }: MapParamsProviderProps) {
  const map = useMap();
  const { data: config } = useConfig();
  const [current, setCurrent] = useState<MapParamsContext>({});

  const handleVariantChange = useCallback(
    (
      cityCode: string,
      visualizationCode: string,
      variantCode: string
    ) => {
      const visualization = config?.[cityCode].visualizations.find(
        (viz) => viz.code === visualizationCode
      );
      const gridCode = visualization?.grid?.code;

      if (gridCode) {
        setCurrent({
          cityCode,
          gridCode,
          visualizationCode,
          variantCode: variantCode,
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

  const handleFiltersChange = useCallback((filters: Record<string, string>) => {
    console.log(filters);
    return setCurrent((state) => ({
      ...state,
      filters,
    }));
  }, []);

  return (
    <MapParamsContext.Provider
      value={{
        ...current,
        onVariantChange: handleVariantChange,
        onVisualizationChange: handleVisualizationChange,
        onCityChange: handleCityChange,
        onHexagonChange: handleHexagonChange,
        onFiltersChange: handleFiltersChange,
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
