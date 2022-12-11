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

export const getGrid = async (
  params: GetGridParams
): Promise<GetGridReturn> => {
  try {
    //   FIXME: Remove this stub
    return grid as any;

    // const response = await fetch(`${BASE_URL}/cities/${cityCode}/grids/${gridCode}.json`);
    // const data = await response.json();
    return data;
  } catch (error) {
    return {};
  }
};

export type GetVisualizationParams = {
  cityCode?: string;
  visualizationCode?: string;
  visualizationVariantCode?: string;
};

export type GetVisualizationReturn = Record<UUID, any>;

export const getVisualization = async (
  params: GetVisualizationParams
): Promise<GetVisualizationReturn> => {
  try {
    //   FIXME: Remove this stub
    return visualization;

    const response = await fetch(
      `${BASE_URL}/cities/${cityCode}/visualizations/${visualizationCode}/${visualizationVariantCode}.json`
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
  visualizationVariantCode?: string;
  featureId?: string;
};

export type GetVisualizationForFeatureReturn = Record<string, any>;

export const getVisualizationForFeature = async ({
  cityCode,
  visualizationCode,
  visualizationVariantCode,
  featureId,
}: GetVisualizationForFeatureParams): Promise<GetVisualizationForFeatureReturn> => {
  try {
    //   FIXME: Remove this stub
    return visualization;

    const response = await fetch(
      `${BASE_URL}/cities/${cityCode}/visualizations/${visualizationCode}/${visualizationVariantCode}/${featureId}.json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return {};
  }
};
