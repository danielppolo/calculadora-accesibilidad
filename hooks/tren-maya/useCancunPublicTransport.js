import useLayer from '../useLayer';

const useCancunPublicTransport = () => useLayer([
  {
    id: 'cancun-via-public-transport',
    sourceLayer: 'existente-transporte-publico-7lhi9a',
    url: 'mapbox://daniel-itdp.9v9fw6g3',
    type: 'line',
    color: '#407ba7',
    label: 'Transporte público existente',
    paint: {
      'line-color': '#407ba7',
      // 'line-opacity': 0.5,
      'line-width': 1,
    },
  },

], 'Transporte público existente');

export default useCancunPublicTransport;
