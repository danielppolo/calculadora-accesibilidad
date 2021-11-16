import useLayer from '../useLayer';

const useCancunVehicular = () => useLayer([
  {
    id: 'cancun-via-vehicular',
    sourceLayer: 'existente-vial-581meg',
    url: 'mapbox://daniel-itdp.7kdy4z1p',
    type: 'line',
    color: '#e6e6e6',
    label: 'Infraestructura vehicular existente',
    paint: {
      'line-color': '#e6e6e6',
      'line-opacity': 0.5,
    },
  },

], 'Infraestructura vehicular existente');

export default useCancunVehicular;
