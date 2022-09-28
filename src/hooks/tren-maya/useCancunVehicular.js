import useLayer from '../useLayer';

const useCancunVehicular = () => useLayer([
  {
    id: 'cancun-via-vehicular',
    sourceLayer: 'existente-vial-2-68tr39',
    url: 'mapbox://daniel-itdp.as0s4e2h',
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
