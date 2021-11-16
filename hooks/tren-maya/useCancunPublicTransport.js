import useLayer from '../useLayer';

const useCancunPublicTransport = () => useLayer([
  {
    id: 'cancun-via-public-transport',
    sourceLayer: 'existente-transporte-publico-7lhi9a',
    url: 'mapbox://daniel-itdp.9v9fw6g3',
    type: 'line',
    color: '#b3b3b3',
    label: 'Transporte público existente',
    paint: {
      'line-color': '#b3b3b3',
      'line-width': 0.5,
    },
  },

], 'Transporte público existente');

export default useCancunPublicTransport;
