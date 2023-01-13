interface GetLegendParams {
  scales: number[];
  colors: string[];
  unit?: string;
  opacity?: number;
}

export const getScalesScales = ({
  scales,
  colors,
  unit = '',
  opacity = 1,
}: GetLegendParams) =>
  scales.map((interval, i) => {
    const start = Intl.NumberFormat().format((scales[i - 1] || 0) + 1);
    const end = Intl.NumberFormat().format(interval);
    const isSameNumber = start === end;
    return {
      color: colors[i],
      opacity,
      label: isSameNumber ? start : `${start} - ${end} ${unit}`,
      topValue: interval,
    };
  });

export default getScalesScales;
