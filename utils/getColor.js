export const getColor = (property, intervals, colors) => {
  const rgbaCases = []
  intervals.forEach((interval, i) => {
    rgbaCases.unshift(['<=', ['get', property], interval], colors[i])
  })
  return ["case",
  ['==', ['get', property], 0], 'transparent',
  ...rgbaCases,
  'transparent',
  ]
}

