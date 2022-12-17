import { NUMBER_OF_BUCKETS } from 'src/constants';

const getIntervals = (maxValue: number, steps: number = NUMBER_OF_BUCKETS) => {
  const intervalStep = maxValue > steps ? steps : maxValue;
  const interval = maxValue / intervalStep;
  return Array.from({ length: intervalStep }, (_, i) =>
    Math.ceil(interval * (i + 1))
  );
};

export default getIntervals;
