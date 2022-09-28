import useLayer from '../useLayer';

const useCancunLandUse = () => useLayer([
  {
    id: 'cancun-uso-area-verde',
    sourceLayer: 'cancun-rea-verde-cwh4b9',
    url: 'mapbox://daniel-itdp.08ua1t6p',
    type: 'fill',
    color: '#70bc4c',
    label: 'Área verde',
    paint: {
      'fill-color': '#70bc4c',
      'fill-opacity': 0.5,
      'fill-outline-color': '#545454'
    },
  },
  {
    id: 'cancun-uso-comercio-centro-urbano',
    sourceLayer: 'cancun-comercio-de-centro-urb-1zxj0h',
    url: 'mapbox://daniel-itdp.apbyfsrm',
    type: 'fill',
    color: '#ff507a',
    label: 'Comercio de centro urbano',
    paint: {
      'fill-color': '#ff507a',
      'fill-opacity': 0.5,
      'fill-outline-color': '#545454'
    },
  },
  {
    id: 'cancun-uso-comercio-subcentro-urbano',
    sourceLayer: 'cancun-comercio-de-subcentro--dg97kw',
    url: 'mapbox://daniel-itdp.drz53ge8',
    type: 'fill',
    color: '#cd5553',
    label: 'Comercio de subcentro urbano',
    paint: {
      'fill-color': '#cd5553',
      'fill-opacity': 0.5,
      'fill-outline-color': '#545454'
    },
  },
  {
    id: 'cancun-uso-equipamiento',
    sourceLayer: 'cancun-equipamiento-2v7h6t',
    url: 'mapbox://daniel-itdp.6x8gw6xn',
    type: 'fill',
    color: '#0063f0',
    label: 'Equipamiento',
    paint: {
      'fill-color': '#0063f0',
      'fill-opacity': 0.5,
      'fill-outline-color': '#545454'
    },
  },
  {
    id: 'cancun-uso-equipamiento-salud',
    sourceLayer: 'cancun-equipamiento-de-salud-dsvz3b',
    url: 'mapbox://daniel-itdp.98h899uw',
    type: 'fill',
    color: '#3f9bff',
    label: 'Equipamiento de salud',
    paint: {
      'fill-color': '#3f9bff',
      'fill-opacity': 0.5,
      'fill-outline-color': '#545454'
    },
  },
  {
    id: 'cancun-uso-equipamiento-educativo',
    sourceLayer: 'cancun-equipamiento-educativo-6s548h',
    url: 'mapbox://daniel-itdp.8hkjbpgc',
    type: 'fill',
    color: '#193d65',
    label: 'Equipamiento educativo',
    paint: {
      'fill-color': '#193d65',
      'fill-opacity': 0.5,
      'fill-outline-color': '#545454'
    },
  },
  {
    id: 'cancun-uso-habitacional',
    sourceLayer: 'cancun-habitacional-08wbek',
    url: 'mapbox://daniel-itdp.c5iqdhfn',
    type: 'fill',
    color: '#fcd84a',
    label: 'Habitacional',
    paint: {
      'fill-color': '#fcd84a',
      'fill-opacity': 0.5,
      'fill-outline-color': '#545454'
    },
  },
  {
    id: 'cancun-uso-industria',
    sourceLayer: 'cancun-industria-6t1xa5',
    url: 'mapbox://daniel-itdp.0gohr6qf',
    type: 'fill',
    color: '#9547f4',
    label: 'Industria',
    paint: {
      'fill-color': '#9547f4',
      'fill-opacity': 0.5,
      'fill-outline-color': '#545454'
    },
  },
  {
    id: 'cancun-uso-mixto',
    sourceLayer: 'cancun-mixto-afpyi0',
    url: 'mapbox://daniel-itdp.avvkjnwk',
    type: 'fill',
    color: '#E8A233',
    label: 'Mixto',
    paint: {
      'fill-color': '#E8A233',
      'fill-opacity': 0.5,
      'fill-outline-color': '#545454'
    },
  },
  {
    id: 'cancun-uso-turismo-hotelero',
    sourceLayer: 'cancun-turismo-hotelero-780zu8',
    url: 'mapbox://daniel-itdp.60qn0tc3',
    type: 'fill',
    color: '#cd5367',
    label: 'Turismo hotelero',
    paint: {
      'fill-color': '#cd5367',
      'fill-opacity': 0.5,
      'fill-outline-color': '#545454'
    },
  },

], 'Usos de suelo');

export default useCancunLandUse;
