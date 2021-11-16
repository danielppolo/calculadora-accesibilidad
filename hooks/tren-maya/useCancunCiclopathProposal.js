import useLayer from '../useLayer';

const useCancunCiclopathProposal = () => useLayer([
  {
    id: 'cancun-via-ciclopath-proposal',
    sourceLayer: 'propuesta-ciclista-1o86ql',
    url: 'mapbox://daniel-itdp.148hd1yd',
    type: 'line',
    color: '#6247aa',
    label: 'Infraestructura ciclista propuesta',
    paint: {
      'line-color': '#6247aa',
      // 'line-opacity': 0.5,
      'line-width': 1.5,
    },
  },

], 'Infraestructura ciclista existente');

export default useCancunCiclopathProposal;
