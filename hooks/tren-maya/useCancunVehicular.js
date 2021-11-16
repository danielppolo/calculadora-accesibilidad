import useLayer from '../useLayer';

const useCancunVehicular = () => useLayer([
  {
    id: 'cancun-via-vehicular',
    sourceLayer: 'existente-vial-581meg',
    url: 'mapbox://daniel-itdp.7kdy4z1p',
    type: 'line',
    color: '#FDA28E',
    label: 'Infraestructura vehicular existente',
    paint: {
      'line-color': '#FDA28E',
      'line-width': 0.25,
    },
  },

], 'Infraestructura vehicular existente');

export default useCancunVehicular;
