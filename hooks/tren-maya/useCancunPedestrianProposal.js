import useLayer from '../useLayer';

const useCancunPedestrianProposal = () => useLayer([
  {
    id: 'cancun-via-pedestrian-proposal',
    sourceLayer: 'propuesta-peatonal-6rcm3o',
    url: 'mapbox://daniel-itdp.d6ed9v1d',
    type: 'line',
    color: '#ff507a',
    label: 'Infraestructura peatonal propuesta',
    paint: {
      'line-color': '#ff507a',
      'line-width': 2,
      'line-dasharray': [6,6]
    },
  },

], 'Infraestructura peatonal existente');

export default useCancunPedestrianProposal;
