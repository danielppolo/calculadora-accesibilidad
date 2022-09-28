export const getLegend = (intervals: number[], colors: string[], unit = '') => intervals.map((interval, i) => {
  const start = Intl.NumberFormat('es-mx').format((intervals[i - 1] || 0) + 1);
  const end = Intl.NumberFormat('es-mx').format(interval);
  const isSameNumber = start === end;
  return ({
    color: colors[i],
    label: isSameNumber ? start : `${start} - ${end} ${unit}`,
  });
});

export default getLegend;
