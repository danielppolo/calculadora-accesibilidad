import useLayer from '../useLayer';

// TODO: Actualizar referencias de Mapbox
const useCancunPublicTransportProposal = () => useLayer([
  {
    id: 'cancun-via-public-transport-proposal',
    sourceLayer: 'existente-transporte-publico-7lhi9a',
    url: 'mapbox://daniel-itdp.9v9fw6g3',
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
