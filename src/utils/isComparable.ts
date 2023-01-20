import { Visualization } from 'src/types';

const isComparable = (visualization?: Visualization) =>
  !!visualization &&
  !!visualization.comparableOptions?.length &&
  !!visualization.customScales?.length;

export default isComparable;
