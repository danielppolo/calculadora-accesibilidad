import useLayer from '../useLayer';

const useCancunPedestrian = () => useLayer([
  {
    id: 'cancun-via-pedestrian',
    sourceLayer: 'existente-peatonal-99lvpp',
    url: 'mapbox://daniel-itdp.4qk3jqjk',
    type: 'line',
    color: '#800016',
    label: 'Infraestructura peatonal existente',
    paint: {
      'line-color': '#800016',
      'line-opacity': 0.5,
    },
  },

], 'Infraestructura peatonal existente');

export default useCancunPedestrian;
