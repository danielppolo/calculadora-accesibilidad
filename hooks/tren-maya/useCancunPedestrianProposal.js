import useLayer from '../useLayer';

const useCancunPedestrianProposal = () => useLayer([
  {
    id: 'cancun-via-pedestrian-proposal',
    sourceLayer: 'propuesta-tren-maya-peatonal',
    url: 'mapbox://daniel-itdp.propuesta-tren-maya-peatonal',
    type: 'line',
    color: '#ff507a',
    label: 'Infraestructura peatonal propuesta',
    paint: {
      'line-color': '#ff507a',
      'line-width': 2,
      'line-dasharray': [3, 3],
    },
    popup: true,
    popupDescriptionKey: 'Red_peaton',
  },

], 'Infraestructura peatonal existente');

export default useCancunPedestrianProposal;
