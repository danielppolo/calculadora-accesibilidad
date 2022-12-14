import { FeatureDictionary, UUID } from 'src/types';

const BASE_URL = process.env.NEXT_PUBLIC_BUCKET_BASE_URL;

export const getCities = async () => {
  const response = await fetch(`${BASE_URL}/core/cities_geometry.json`);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error('Something went wrong');
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
  const response = await fetch(
    `${BASE_URL}/cities/${cityCode}/grids/${gridCode}.json`
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error('Something went wrong');
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
  const response = await fetch(
    `${BASE_URL}/cities/${cityCode}/visualizations/${visualizationCode}/${variantCode}.json`
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error('Something went wrong');
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
  const response = await fetch(
    `${BASE_URL}/cities/${cityCode}/visualizations/${visualizationCode}/${variantCode}/${featureId}.json`
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error('Something went wrong');
};
