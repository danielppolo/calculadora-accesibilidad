import useLayer from '../useLayer';

const useCancunPopulationDensity = () => useLayer([
  {
    id: 'cancun-densidad-very-low',
    sourceLayer: 'cancun-density-very_low-csyicp',
    url: 'mapbox://daniel-itdp.b7ijw12u',
    type: 'fill',
    color: '#ffffb2',
    label: '1 - 65',
    paint: {
      'fill-color': '#ffffb2',
      'fill-opacity': 0.75,
      'fill-outline-color': '#545454'
    },
  },
  {
    id: 'cancun-densidad-low',
    sourceLayer: 'cancun-density-low-3nb4gg',
    url: 'mapbox://daniel-itdp.02h5d7ki',
    type: 'fill',
    color: '#fecc5c',
    label: '66 - 144',
    paint: {
      'fill-color': '#fecc5c',
      'fill-opacity': 0.75,
      'fill-outline-color': '#545454'
    },
  },
  {
    id: 'cancun-densidad-medium',
    sourceLayer: 'cancun-density-medium-9uyxtv',
    url: 'mapbox://daniel-itdp.biqvib3x',
    type: 'fill',
    color: '#fd8d3c',
    label: '145 - 218',
    paint: {
      'fill-color': '#fd8d3c',
      'fill-opacity': 0.75,
      'fill-outline-color': '#545454'
    },
  },
  {
    id: 'cancun-densidad-high',
    sourceLayer: 'cancun-density-high-corz2q',
    url: 'mapbox://daniel-itdp.40xvzrxt',
    type: 'fill',
    color: '#f03b20',
    label: '219 - 374',
    paint: {
      'fill-color': '#f03b20',
      'fill-opacity': 0.75,
      'fill-outline-color': '#545454'
    },
  },
  {
    id: 'cancun-densidad-very-high',
    sourceLayer: 'cancun-density-very_high-9gml9s',
    url: 'mapbox://daniel-itdp.647isvdm',
    type: 'fill',
    color: '#bd0026',
    label: '375 - 6,294',
    paint: {
      'fill-color': '#bd0026',
      'fill-opacity': 0.75,
      'fill-outline-color': '#545454'
    },
  },

], 'Densidad de población');

export default useCancunPopulationDensity;
