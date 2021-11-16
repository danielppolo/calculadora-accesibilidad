import useLayer from '../useLayer';

const useCancunVehicularProposal = () => useLayer([
  {
    id: 'cancun-via-vehicular-proposal',
    sourceLayer: 'propuesta-vial-8rwaez',
    url: 'mapbox://daniel-itdp.0davsxaf',
    type: 'line',
    color: '#fd6541',
    label: 'Infraestructura vehicular propuesta',
    paint: {
      'line-color': '#fd6541',
      'line-width': 2,
      'line-dasharray': [3,3]
    },
  },

], 'Infraestructura vehicular existente');

export default useCancunVehicularProposal;
