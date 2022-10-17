import React, {
  useEffect,
  useState,
} from 'react';

import {
  City, FeatureDictionary,
} from 'src/types';
import { getGrid, getVisualization } from 'src/utils/api';
import useConfig from 'src/hooks/data/useConfig';
import MapLayer from './MapLayer';
import MapProvider from './MapProvider';
import LoadingOverlay from './LoadingOverlay';

type Code = string;

type MapData = Record<City['code'], {
  grids: Record<Code, FeatureDictionary>,
  visualizations: Record<Code, Record<string, Record<Code, any>>>,
}>;

type Current = {
  cityCode?: string,
  gridCode?: string,
  visualizationCode?: string,
  variantCode?: string,
}

const generateMapData = (cities: City[]): MapData => {
  const data: MapData = {};
  cities.forEach((city) => {
    data[city.code] = {
      grids: {},
      visualizations: {},
    };
  });
  return data;
};

function Map() {
  const { config, loading: configLoading } = useConfig();
  const [loading, setLoading] = useState(false);
  const [mapData, setMapData] = useState<MapData>({});
  const [current, setCurrent] = useState<Current>();
  useEffect(() => {
    if (config) {
      setMapData(generateMapData(Object.values(config)));
    }
  }, [config]);

  const handleVariantChange = async (
    cityCode: string,
    visualizationCode: string,
    visualizationVariantCode: string,
  ) => {
    const visualization = config[cityCode].visualizations
      .find((viz) => viz.code === visualizationCode);
    const gridCode = visualization?.grid?.code;
    if (gridCode) {
      const variantData = await getVisualization(
        cityCode,
        visualizationCode,
        visualizationVariantCode,
      );
      // Object.keys(propertiesData).forEach((id) => {
      //   Object.assign(grid[id].properties, propertiesData[id]);
      // });

      const newData = { ...mapData };
      if (!newData[cityCode].visualizations[visualizationCode]) {
        newData[cityCode].visualizations[visualizationCode] = {};
      }
      newData[cityCode].visualizations[visualizationCode][visualizationVariantCode] = variantData;
      setCurrent({
        cityCode,
        gridCode,
        visualizationCode,
        variantCode: visualizationVariantCode,
      });
      setMapData(newData);
    }
  };

  const handleVisualizationChange = async (
    cityCode: string,
    visualizationCode: string,
  ) => {
    setLoading(true);
    const visualization = config[cityCode].visualizations
      .find((viz) => viz.code === visualizationCode);
    const defaultVariantCode = visualization?.defaultVariant?.code;
    const gridCode = visualization?.grid?.code;

    if (defaultVariantCode && gridCode) {
      await handleVariantChange(cityCode, visualizationCode, defaultVariantCode);
    }

    if (gridCode) {
      const grid = await getGrid(cityCode, gridCode);
      const newData = { ...mapData };
      newData[cityCode].grids[gridCode] = grid;
      setMapData(newData);
      setCurrent((state) => ({ ...state, gridCode }));
    }

    if (visualization?.code) {
      setCurrent((state) => ({ ...state, visualizationCode }));
    }

    setLoading(false);
  };

  const handleCityChange = (cityCode?: string) => {
    if (cityCode) {
      const { defaultVisualization } = config[cityCode];

      if (defaultVisualization) {
        handleVisualizationChange(cityCode, defaultVisualization.code);
      }
    }

    setCurrent((state) => ({ ...state, cityCode }));
  };

  return (
    <>
      <LoadingOverlay open={loading || configLoading} />
      <MapProvider>
        <MapLayer
          mapData={mapData}
          current={current}
          config={config}
          onLoading={setLoading}
          onCityChange={handleCityChange}
          onVisualizationChange={handleVisualizationChange}
          onVariantChange={handleVariantChange}
        />
      </MapProvider>
    </>
  );
}

export default Map;
