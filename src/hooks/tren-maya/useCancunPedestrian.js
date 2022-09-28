import useLayer from '../useLayer';

const useCancunPedestrian = () => useLayer([
  {
    id: 'cancun-via-pedestrian',
    sourceLayer: 'existente-peatonal-99lvpp',
    url: 'mapbox://daniel-itdp.4qk3jqjk',
    type: 'line',
    color: '#FF9CB3',
    label: 'Infraestructura peatonal existente',
    paint: {
      'line-color': '#FF9CB3',
      'line-width': 0.5,
    },
  },

], 'Infraestructura peatonal existente');

export default useCancunPedestrian;
