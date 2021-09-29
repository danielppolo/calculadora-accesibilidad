export const getLegend = (intervals, colors) => intervals.map((interval, i) => {
  const start = Intl.NumberFormat().format((intervals[i-1] || 0) + 1)
  const end = Intl.NumberFormat().format(interval)
  const isSameNumber = start === end;
  return ({
    color: colors[i],
    label: isSameNumber ? start : `${start} - ${end}`,
  })
})
