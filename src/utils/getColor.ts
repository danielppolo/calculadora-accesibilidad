import { Expression } from 'mapbox-gl';

const getColor = (
  property: string,
  scales: number[],
  colors: string[]
): Expression => {
  const rgbaCases: Array<Expression | string> = [];

  [...scales].reverse().forEach((interval, i) => {
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
