import useLayer from '../useLayer';

const useCancunVehicular = () => useLayer([
  {
    id: 'cancun-via-vehicular',
    sourceLayer: 'existente-vial-581meg',
    url: 'mapbox://daniel-itdp.7kdy4z1p',
    type: 'line',
    color: '#ff4800',
    label: 'Infraestructura vehicular existente',
    paint: {
      'line-color': '#ff4800',
      'line-opacity': 0.5,
    },
  },

], 'Infraestructura vehicular existente');

export default useCancunVehicular;
