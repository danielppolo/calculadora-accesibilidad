import useLayer from '../useLayer';

// TODO: Actualizar referencias de Mapbox
const useCancunPedestrianProposal = () => useLayer([
  {
    id: 'cancun-via-pedestrian-proposal',
    sourceLayer: 'existente-peatonal-99lvpp',
    url: 'mapbox://daniel-itdp.4qk3jqjk',
    type: 'line',
    color: '#800016',
    label: 'Infraestructura peatonal propuesta',
    paint: {
      'line-color': '#800016',
      'line-opacity': 0.5,
    },
  },

], 'Infraestructura peatonal existente');

export default useCancunPedestrianProposal;
