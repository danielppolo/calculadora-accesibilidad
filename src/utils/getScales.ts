import { NUMBER_OF_SCALES } from 'src/constants';

const getScales = (
  maxValue: number,
  numberOfScales: number = NUMBER_OF_SCALES
) => {
  const scaleSize = maxValue > numberOfScales ? numberOfScales : maxValue;
  const scale = maxValue / scaleSize;

  return Array.from({ length: scaleSize }, (_, i) =>
    Math.ceil(scale * (i + 1))
  );
};

export default getScales;
