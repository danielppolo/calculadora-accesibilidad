import type { Feature, GeoJsonProperties, Polygon } from 'geojson';
import get from 'lodash/get';
import { FeatureDictionary } from 'src/types';

interface FilterFeaturesParams {
  data: Record<string, any>;
  grid: FeatureDictionary;
  featureId?: string;
  variantFilters: Record<string, string>;
  unit: string;
  totalProperty: string;
  limit?: number;
}

interface FilterFeaturesReturn {
  features: Feature<Polygon, GeoJsonProperties>[];
  maxValue: number;
}

const filterFeatures = ({
  data,
  featureId,
  variantFilters,
  grid,
  totalProperty,
  unit,
  limit,
}: FilterFeaturesParams): FilterFeaturesReturn => {
  let maxValue = 0;

  const features = Object.keys(data).reduce(
    (filtered: Feature<Polygon, GeoJsonProperties>[], hexId, index) => {
      const isClickedHexagon = hexId === featureId;
      let total: number =
        get(data[hexId], Object.values(variantFilters), {}) ?? 0;

      if (total > maxValue) {
        maxValue = total;
      }

      if (isClickedHexagon) {
        total = total || 1;
      }

      // We filter features with no data
      const isInRange = limit ? total <= limit : true;
      if ((total > 0 && isInRange) || isClickedHexagon) {
        filtered.push({
          ...grid[hexId],
          // Integer arbitrary identifier
          id: index,
          properties: {
            ...grid[hexId].properties,
            // Hexagon identifier
            id: hexId,
            [totalProperty]: total,
            description: `${new Intl.NumberFormat().format(total)}  ${unit}`,
          },
        });
      }

      return filtered;
    },
    []
  );

  return { features, maxValue };
};

export default filterFeatures;
