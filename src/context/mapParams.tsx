import React, { useContext, useState } from 'react';
import { Config } from 'src/types';
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
  config?: Config;
}

function MapParamsProvider({ children, config }: MapParamsProviderProps) {
  const map = useMap();
  const [current, setCurrent] = useState<MapParamsContext>({});

  const handleVariantChange = (
    cityCode: string,
    visualizationCode: string,
    visualizationVariantCode: string
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
        variantCode: visualizationVariantCode,
      });
    } else {
      // TODO:
    }
  };

  const handleVisualizationChange = (
    cityCode: string,
    visualizationCode: string
  ) => {
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
  };

  const handleCityChange = (cityCode?: string) => {
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
  };

  const handleHexagonChange = (hexagonId: string) => {
    console.log(hexagonId);
    return setCurrent((state) => ({
      ...state,
      hexagonId,
    }));
  };

  const handleFiltersChange = (filters: Record<string, string>) => {
    console.log(filters);
    return setCurrent((state) => ({
      ...state,
      filters,
    }));
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
