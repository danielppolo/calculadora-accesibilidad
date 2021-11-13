import useLayer from '../useLayer';

// TODO: Actualizar referencias de Mapbox
const useCancunCiclopathProposal = () => useLayer([
  {
    id: 'cancun-via-ciclopath-proposal',
    sourceLayer: 'existente-ciclista-4qdc7k',
    url: 'mapbox://daniel-itdp.7sq6i9am',
    type: 'line',
    color: '#6247aa',
    label: 'Infraestructura ciclista propuesta',
    paint: {
      'line-color': '#6247aa',
      // 'line-opacity': 0.5,
      'line-width': 2,
    },
  },

], 'Infraestructura ciclista existente');

export default useCancunCiclopathProposal;