import { Expression } from 'mapbox-gl';

const getColor = (
  property: string,
  intervals: number[],
  colors: string[]
): Expression => {
  const rgbaCases: Array<Expression | string> = [];
  intervals.forEach((interval, i) => {
    rgbaCases.unshift(['<=', ['get', property], interval], colors[i]);
  });
  return [
    'case',
    ['==', ['get', property], 0],
    'transparent',
    ...rgbaCases,
    'transparent',
  ];
};

export default getColor;
