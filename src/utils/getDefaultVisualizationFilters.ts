import { COMPARABLE_KEY } from 'src/constants';
import { Visualization } from 'src/types';
import isComparable from './isComparable';

const getDefaultVisualizationFilters = (visualization?: Visualization) => {
  const defaultVariantFilters: Record<string, string> = {};

  visualization?.filters.forEach((filter) => {
    defaultVariantFilters[filter.code] = filter.defaultOption.code;
  });

  if (
    visualization &&
    isComparable(visualization) &&
    visualization?.customScales?.[0]
  ) {
    defaultVariantFilters[COMPARABLE_KEY] =
      visualization?.customScales?.[0].toString();
  }

  return defaultVariantFilters;
};

export default getDefaultVisualizationFilters;
