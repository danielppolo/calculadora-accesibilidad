import useLayer from '../useLayer';

const useCancunPublicTransportProposal = () => useLayer([
  {
    id: 'cancun-via-public-transport-proposal',
    sourceLayer: 'propuesta-transporte-publico-6lavdu',
    url: 'mapbox://daniel-itdp.5kst1mfj',
    type: 'line',
    color: '#00043a',
    label: 'Transporte público propuesto',
    paint: {
      'line-color': '#00043a',
      // 'line-opacity': 0.5,
      'line-width': 1.5,
    },
  },

], 'Transporte público existente');

export default useCancunPublicTransportProposal;
