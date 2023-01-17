import { Visualization } from 'src/types';

const buildUnitDictionary = (filters: Visualization['filters']) => {
  const unitDict: Record<string, string> = {};
  filters.forEach((filter) => {
    filter.options.forEach((option) => {
      if (option.code && option.unit) {
        unitDict[option.code] = option.unit;
      }
    });
  });

  return unitDict;
};

export default buildUnitDictionary;
