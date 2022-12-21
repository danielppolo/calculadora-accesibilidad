interface GetLegendParams {
  intervals: number[];
  colors: string[];
  unit?: string;
  opacity?: number;
}

export const getLegend = ({
  intervals,
  colors,
  unit = '',
  opacity = 1,
}: GetLegendParams) =>
  intervals.map((interval, i) => {
    const start = Intl.NumberFormat().format((intervals[i - 1] || 0) + 1);
    const end = Intl.NumberFormat().format(interval);
    const isSameNumber = start === end;
    return {
      color: colors[i],
      opacity,
      label: isSameNumber ? start : `${start} - ${end} ${unit}`,
    };
  });

export default getLegend;
