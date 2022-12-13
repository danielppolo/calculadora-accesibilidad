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

export type GetGridParams = {
  cityCode?: string;
  gridCode?: string;
};

export type GetGridReturn = FeatureDictionary;

export const getGrid = async ({
  cityCode,
  gridCode,
}: GetGridParams): Promise<GetGridReturn> => {
  try {
    const response = await fetch(
      `${BASE_URL}/cities/${cityCode}/grids/${gridCode}.json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return {};
  }
};

export type GetVisualizationParams = {
  cityCode?: string;
  visualizationCode?: string;
  variantCode?: string;
};

export type GetVisualizationReturn = Record<UUID, any>;

export const getVisualization = async ({
  cityCode,
  visualizationCode,
  variantCode,
}: GetVisualizationParams): Promise<GetVisualizationReturn> => {
  try {
    const response = await fetch(
      `${BASE_URL}/cities/${cityCode}/visualizations/${visualizationCode}/${variantCode}.json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return {};
  }
};

export type GetVisualizationForFeatureParams = {
  cityCode?: string;
  visualizationCode?: string;
  variantCode?: string;
  featureId?: string;
};

export type GetVisualizationForFeatureReturn = Record<string, any>;

export const getVisualizationForFeature = async ({
  cityCode,
  visualizationCode,
  variantCode,
  featureId,
}: GetVisualizationForFeatureParams): Promise<GetVisualizationForFeatureReturn> => {
  try {
    const response = await fetch(
      `${BASE_URL}/cities/${cityCode}/visualizations/${visualizationCode}/${variantCode}/${featureId}.json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return {};
  }
};
