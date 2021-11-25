import useLayer from '../useLayer';

const useCancunCiclopath = () => useLayer([
  {
    id: 'cancun-via-ciclopath',
    sourceLayer: 'existente-ciclista-4qdc7k',
    url: 'mapbox://daniel-itdp.7sq6i9am',
    type: 'line',
    color: '#9FC88C',
    label: 'Infraestructura ciclista existente',
    paint: {
      'line-color': '#9FC88C',
      'line-width': 1.5,
    },
  },

], 'Infraestructura ciclista existente');

export default useCancunCiclopath;
