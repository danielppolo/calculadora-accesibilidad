import useLayer from '../useLayer';

const useCancunCiclopath = () => useLayer([
  {
    id: 'cancun-via-ciclopath',
    sourceLayer: 'existente-ciclista-4qdc7k',
    url: 'mapbox://daniel-itdp.7sq6i9am',
    type: 'line',
    color: '#808080',
    label: 'Infraestructura ciclista existente',
    paint: {
      'line-color': '#808080',
      'line-width': 0.5,
    },
  },

], 'Infraestructura ciclista existente');

export default useCancunCiclopath;
