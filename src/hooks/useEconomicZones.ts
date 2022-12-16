import useLayer from 'src/hooks/useLayer';

const layers = [
  {
    id: 'uso-acuicola',
    sourceLayer: 'ACUACOLA-2yg0mz',
    url: 'mapbox://daniel-itdp.0hbjuuxe',
    type: 'fill' as const,
    color: '#839E34',
    label: 'Acuícola',
    paint: {
      'fill-color': '#839E34',
      'fill-opacity': 0.3,
    },
  },
  {
    id: 'uso-agricultura',
    sourceLayer: 'AGRICULTURA-1nglu1',
    url: 'mapbox://daniel-itdp.d2k35cu0',
    type: 'fill' as const,
    color: '#f7e1d7',
    label: 'Agricultura',
    paint: {
      'fill-color': '#f7e1d7',
      'fill-opacity': 0.3,
    },
  },
  {
    id: 'uso-bosque',
    sourceLayer: 'BOSQUE-7bt0zj',
    url: 'mapbox://daniel-itdp.beyf3el7',
    type: 'fill' as const,
    color: '#56FF00',
    label: 'Bosque',
    paint: {
      'fill-color': '#56FF00',
      'fill-opacity': 0.3,
    },
  },
  {
    id: 'uso-manglar',
    sourceLayer: 'MANGLAR-1l7c13',
    url: 'mapbox://daniel-itdp.4ownv4ef',
    type: 'fill' as const,
    color: '#06d6a0',
    label: 'Manglar',
    paint: {
      'fill-color': '#06d6a0',
      'fill-opacity': 0.3,
    },
  },
  {
    id: 'uso-palmar',
    sourceLayer: 'PALMAR-72pfn1',
    url: 'mapbox://daniel-itdp.1urge0yl',
    type: 'fill' as const,
    color: '#b0c4b1',
    label: 'Palmar',
    paint: {
      'fill-color': '#b0c4b1',
      'fill-opacity': 0.3,
    },
  },
  {
    id: 'uso-pastizal',
    sourceLayer: 'PASTIZAL-bq1of5',
    url: 'mapbox://daniel-itdp.72apyli2',
    type: 'fill' as const,
    color: '#f07167',
    label: 'Pastizal',
    paint: {
      'fill-color': '#f07167',
      'fill-opacity': 0.3,
    },
  },
  {
    id: 'uso-popal',
    sourceLayer: 'POPAL-9rmy4h',
    url: 'mapbox://daniel-itdp.6ck31sow',
    type: 'fill' as const,
    color: '#e09f3e',
    label: 'Popal',
    paint: {
      'fill-color': '#e09f3e',
      'fill-opacity': 0.3,
    },
  },
  {
    id: 'uso-pradera',
    sourceLayer: 'PRADERA-dfw8up',
    url: 'mapbox://daniel-itdp.9iniqxjq',
    type: 'fill' as const,
    color: '#73B2FF',
    label: 'Pradera',
    paint: {
      'fill-color': '#73B2FF',
      'fill-opacity': 0.3,
    },
  },
  {
    id: 'uso-sabana',
    sourceLayer: 'SABANA-2vail2',
    url: 'mapbox://daniel-itdp.6rlo2deo',
    type: 'fill' as const,
    color: '#AB66CD',
    label: 'Sabana',
    paint: {
      'fill-color': '#AB66CD',
      'fill-opacity': 0.3,
    },
  },
  {
    id: 'uso-sabanoide',
    sourceLayer: 'SABANOIDE-3pd4ms',
    url: 'mapbox://daniel-itdp.2s483ltu',
    type: 'fill' as const,
    color: '#A900E6',
    label: 'Sabanoide',
    paint: {
      'fill-color': '#A900E6',
      'fill-opacity': 0.3,
    },
  },
  {
    id: 'uso-selva',
    sourceLayer: 'SELVA-b6b0f8',
    url: 'mapbox://daniel-itdp.91wyqcgu',
    type: 'fill' as const,
    color: '#335c67',
    label: 'Selva',
    paint: {
      'fill-color': '#335c67',
      'fill-opacity': 0.3,
    },
  },
  {
    id: 'uso-tular',
    sourceLayer: 'TULAR-3gc9eg',
    url: 'mapbox://daniel-itdp.5v1yy0up',
    type: 'fill' as const,
    color: '#4C0074',
    label: 'Tular',
    paint: {
      'fill-color': '#4C0074',
      'fill-opacity': 0.3,
    },
  },
  {
    id: 'uso-vegetacion',
    sourceLayer: 'VEGETACIAN-crfdfe',
    url: 'mapbox://daniel-itdp.99g1iz3q',
    type: 'fill' as const,
    color: '#D7D79E',
    label: 'Vegetación',
    paint: {
      'fill-color': '#D7D79E',
      'fill-opacity': 0.3,
    },
  },
  {
    id: 'uso-urbano',
    sourceLayer: 'URBANO-0kaglx',
    url: 'mapbox://daniel-itdp.chrdbq0i',
    type: 'fill' as const,
    color: '#9C9C9C',
    label: 'Zona Urbana',
    paint: {
      'fill-color': '#9C9C9C',
      'fill-opacity': 0.3,
    },
  },
];

const useEconomicZones = () => useLayer(layers, 'Uso de suelo CONAVI');

export default useEconomicZones;
