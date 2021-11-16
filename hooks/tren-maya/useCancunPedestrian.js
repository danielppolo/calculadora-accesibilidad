import useLayer from '../useLayer';

const useCancunPedestrian = () => useLayer([
  {
    id: 'cancun-via-pedestrian',
    sourceLayer: 'existente-peatonal-99lvpp',
    url: 'mapbox://daniel-itdp.4qk3jqjk',
    type: 'line',
    color: '#4d4d4d',
    label: 'Infraestructura peatonal existente',
    paint: {
      'line-color': '#4d4d4d',
      'line-width': 0.5,
    },
  },

], 'Infraestructura peatonal existente');

export default useCancunPedestrian;
