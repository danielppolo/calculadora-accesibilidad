import useLayer from '../useLayer';

// TODO: Actualizar referencias de Mapbox
const useCancunVehicularProposal = () => useLayer([
  {
    id: 'cancun-via-vehicular-proposal',
    sourceLayer: 'existente-vial-581meg',
    url: 'mapbox://daniel-itdp.7kdy4z1p',
    type: 'line',
    color: '#ff4800',
    label: 'Infraestructura vehicular propuesta',
    paint: {
      'line-color': '#ff4800',
      'line-opacity': 0.5,
    },
  },

], 'Infraestructura vehicular existente');

export default useCancunVehicularProposal;
