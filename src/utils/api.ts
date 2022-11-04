import grid from 'src/mocks/grid.json';
import visualization from 'src/mocks/viz.json';

import { FeatureDictionary, UUID } from 'src/types';

const BASE_URL = process.env.NEXT_PUBLIC_BUCKET_BASE_URL;

export const getCities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/core/cities_geometry.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {};
  }
};

export const getGrid = async (
  cityCode: string,
  gridCode: string
): Promise<FeatureDictionary> => {
  try {
    // const response = await fetch(`${BASE_URL}/cities/${cityCode}/grids/${gridCode}.json`);
    // const data = await response.json();
    //   FIXME: Remove this stub
    return grid as any;
    return data;
  } catch (error) {
    return {};
  }
};

export const getVisualization = async (
  cityCode: string,
  visualizationCode: string,
  visualizationVariantCode: string
): Promise<Record<UUID, any>> => {
  try {
    // const response = await fetch(`${BASE_URL}/cities/${cityCode}/visualizations/${visualizationCode}/${visualizationVariantCode}.json`);
    // const data = await response.json();
    //   FIXME: Remove this stub
    return visualization;
    return data;
  } catch (error) {
    return {};
  }
};

export const getVisualizationForFeature = async (
  cityCode: string,
  visualizationCode: string,
  visualizationVariantCode: string,
  featureId: string
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/cities/${cityCode}/visualizations/${visualizationCode}/${visualizationVariantCode}/${featureId}.json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return {};
  }
};
