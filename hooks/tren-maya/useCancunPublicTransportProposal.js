import useLayer from '../useLayer';

const useCancunPublicTransportProposal = () => useLayer([
  {
    id: 'cancun-via-public-transport-proposal',
    sourceLayer: 'propuesta-tren-maya-tp',
    url: 'mapbox://daniel-itdp.propuesta-tren-maya-tp',
    type: 'line',
    color: '#9547f4',
    label: 'Transporte público propuesto',
    paint: {
      'line-color': '#9547f4',
      'line-width': 2,
      'line-dasharray': [3, 3],
    },
    popup: true,
    popupDescriptionKey: 'TP',
  },

], 'Transporte público existente');

export default useCancunPublicTransportProposal;
