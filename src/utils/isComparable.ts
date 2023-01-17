import { Visualization } from 'src/types';

const isComparable = (visualization?: Visualization) =>
  !!visualization &&
  !!visualization.comparable &&
  !!visualization.customScales?.length;

export default isComparable;
