import useLayer from '../useLayer';

const useCancunCiclopath = () => useLayer([
  {
    id: 'cancun-via-ciclopath',
    sourceLayer: 'existente-ciclista-4qdc7k',
    url: 'mapbox://daniel-itdp.7sq6i9am',
    type: 'line',
    color: '#a06cd5',
    label: 'Infraestructura ciclista existente',
    paint: {
      'line-color': '#a06cd5',
      // 'line-opacity': 0.5,
      'line-width': 2,
    },
  },

], 'Infraestructura ciclista existente');

export default useCancunCiclopath;
