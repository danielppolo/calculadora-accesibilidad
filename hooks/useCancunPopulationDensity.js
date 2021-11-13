import useLayer from './useLayer';

const useCancunPopulationDensity = () => useLayer([
  {
    id: 'cancun-densidad-very-low',
    sourceLayer: 'cancun-density-very_low-csyicp',
    url: 'mapbox://daniel-itdp.b7ijw12u',
    type: 'fill',
    color: '#FFFFB2',
    label: '1 - 65',
    paint: {
      'fill-color': '#FFFFB2',
      'fill-opacity': 0.5,
    },
  },
  {
    id: 'cancun-densidad-low',
    sourceLayer: 'cancun-density-low-3nb4gg',
    url: 'mapbox://daniel-itdp.02h5d7ki',
    type: 'fill',
    color: '#FECC5C',
    label: '65 - 144',
    paint: {
      'fill-color': '#FECC5C',
      'fill-opacity': 0.5,
    },
  },
  {
    id: 'cancun-densidad-medium',
    sourceLayer: 'cancun-density-medium-9uyxtv',
    url: 'mapbox://daniel-itdp.biqvib3x',
    type: 'fill',
    color: '#FD8D3C',
    label: '144 - 218',
    paint: {
      'fill-color': '#FD8D3C',
      'fill-opacity': 0.5,
    },
  },
  {
    id: 'cancun-densidad-high',
    sourceLayer: 'cancun-density-high-corz2q',
    url: 'mapbox://daniel-itdp.40xvzrxt',
    type: 'fill',
    color: '#F03B20',
    label: '218 - 374',
    paint: {
      'fill-color': '#F03B20',
      'fill-opacity': 0.5,
    },
  },
  {
    id: 'cancun-densidad-very-high',
    sourceLayer: 'cancun-density-very_high-9gml9s',
    url: 'mapbox://daniel-itdp.647isvdm',
    type: 'fill',
    color: '#BD0026',
    label: '374 - 6,294',
    paint: {
      'fill-color': '#BD0026',
      'fill-opacity': 0.5,
    },
  },

], 'Densidad de población');

export default useCancunPopulationDensity;
