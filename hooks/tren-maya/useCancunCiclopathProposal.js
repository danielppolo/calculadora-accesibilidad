import useLayer from '../useLayer';

const useCancunCiclopathProposal = () => useLayer([
  {
    id: 'cancun-via-ciclopath-proposal',
    sourceLayer: 'propuesta-ciclista-1o86ql',
    url: 'mapbox://daniel-itdp.148hd1yd',
    type: 'line',
    color: '#70bc4c',
    label: 'Infraestructura ciclista propuesta',
    paint: {
      'line-color': '#70bc4c',
      'line-width': 2,
      'line-dasharray': [3,3]
    },
  },

], 'Infraestructura ciclista existente');

export default useCancunCiclopathProposal;
