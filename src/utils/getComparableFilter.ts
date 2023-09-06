import { Visualization } from 'src/types';

const getComparableFilter = (visualization?: Visualization) =>
  visualization && visualization.filters[visualization.filters.length - 1];

export default getComparableFilter;
