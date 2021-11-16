import useLayer from '../useLayer';

const useCancunPedestrianProposal = () => useLayer([
  {
    id: 'cancun-via-pedestrian-proposal',
    sourceLayer: 'propuesta-peatonal-6rcm3o',
    url: 'mapbox://daniel-itdp.d6ed9v1d',
    type: 'line',
    color: '#800016',
    label: 'Infraestructura peatonal propuesta',
    paint: {
      'line-color': '#800016',
      'line-opacity': 1,
      'line-width': 1.5,
    },
  },

], 'Infraestructura peatonal existente');

export default useCancunPedestrianProposal;
