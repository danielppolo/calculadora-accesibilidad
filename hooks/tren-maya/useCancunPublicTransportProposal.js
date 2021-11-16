import useLayer from '../useLayer';

const useCancunPublicTransportProposal = () => useLayer([
  {
    id: 'cancun-via-public-transport-proposal',
    sourceLayer: 'propuesta-transporte-publico-6lavdu',
    url: 'mapbox://daniel-itdp.5kst1mfj',
    type: 'line',
    color: '#9547f4',
    label: 'Transporte público propuesto',
    paint: {
      'line-color': '#9547f4',
      'line-width': 2,
      'line-dasharray': [3,3]
    },
  },

], 'Transporte público existente');

export default useCancunPublicTransportProposal;
