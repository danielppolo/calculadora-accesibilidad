import useLayer from '../useLayer';

const useCancunVehicularProposal = () => useLayer([
  {
    id: 'cancun-via-vehicular-proposal',
    sourceLayer: 'propuesta-vial-8rwaez',
    url: 'mapbox://daniel-itdp.0davsxaf',
    type: 'line',
    color: '#ff4800',
    label: 'Infraestructura vehicular propuesta',
    paint: {
      'line-color': '#ff4800',
      'line-opacity': 1,
      'line-width': 1.5,
    },
  },

], 'Infraestructura vehicular existente');

export default useCancunVehicularProposal;
