export const getIntervals = ( maxValue, steps = NUMBER_OF_BUCKETS) => {
  const intervalStep = maxValue > steps ? steps : maxValue;
  const interval = maxValue / intervalStep;
  return Array.from({length: intervalStep}, (_, i) => Math.ceil(interval * (i + 1)))
}
