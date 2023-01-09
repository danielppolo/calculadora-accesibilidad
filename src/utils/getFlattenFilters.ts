import { Filter } from 'src/types';

const enterFilters = (
  depth: number,
  currentFilters: Filter[],
  words: any
): any => {
  const filter = currentFilters[depth];
  const result = filter.options.map((option) => {
    const joinedCodes = { ...words, ...{ [filter.code]: option.code } };
    if (currentFilters.length <= depth + 1) {
      return joinedCodes;
    }
    return enterFilters(depth + 1, currentFilters, joinedCodes);
  });

  return result;
};

const getFlattenFilters = (filters: Filter[]) => {
  // TODO: Validate that depth is dynamic and correct
  const filtersDepth = filters.length;

  const variants: Array<Record<string, string>> = enterFilters(
    0,
    filters,
    []
  ).flat(filtersDepth - 1);

  return variants;
};

export default getFlattenFilters;
