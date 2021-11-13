import useLayer from '../useLayer';

const useCancunLandUse = () => useLayer([
  {
    id: 'cancun-uso-area-verde',
    sourceLayer: 'cancun-rea-verde-cwh4b9',
    url: 'mapbox://daniel-itdp.08ua1t6p',
    type: 'fill',
    color: '#81dc59',
    label: 'Área verde',
    paint: {
      'fill-color': '#81dc59',
      'fill-opacity': 0.5,
    },
  },
  {
    id: 'cancun-uso-comercio-centro-urbano',
    sourceLayer: 'cancun-comercio-de-centro-urb-1zxj0h',
    url: 'mapbox://daniel-itdp.apbyfsrm',
    type: 'fill',
    color: '#E04A91',
    label: 'Comercio de centro urbano',
    paint: {
      'fill-color': '#E04A91',
      'fill-opacity': 0.5,
    },
  },
  {
    id: 'cancun-uso-comercio-subcentro-urbano',
    sourceLayer: 'cancun-comercio-de-subcentro--dg97kw',
    url: 'mapbox://daniel-itdp.drz53ge8',
    type: 'fill',
    color: '#E00036',
    label: 'Comercio de subcentro urbano',
    paint: {
      'fill-color': '#E00036',
      'fill-opacity': 0.5,
    },
  },
  {
    id: 'cancun-uso-equipamiento',
    sourceLayer: 'cancun-equipamiento-2v7h6t',
    url: 'mapbox://daniel-itdp.6x8gw6xn',
    type: 'fill',
    color: '#2F73BC',
    label: 'Equipamiento',
    paint: {
      'fill-color': '#2F73BC',
      'fill-opacity': 0.5,
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
    },
  },
  {
    id: 'cancun-uso-habitacional',
    sourceLayer: 'cancun-habitacional-08wbek',
    url: 'mapbox://daniel-itdp.c5iqdhfn',
    type: 'fill',
    color: '#EAE490',
    label: 'Habitacional',
    paint: {
      'fill-color': '#EAE490',
      'fill-opacity': 0.5,
    },
  },
  {
    id: 'cancun-uso-industria',
    sourceLayer: 'cancun-industria-6t1xa5',
    url: 'mapbox://daniel-itdp.0gohr6qf',
    type: 'fill',
    color: '#8E01FF',
    label: 'Industria',
    paint: {
      'fill-color': '#8E01FF',
      'fill-opacity': 0.5,
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
    },
  },
  {
    id: 'cancun-uso-turismo-hotelero',
    sourceLayer: 'cancun-turismo-hotelero-780zu8',
    url: 'mapbox://daniel-itdp.60qn0tc3',
    type: 'fill',
    color: '#E65069',
    label: 'Turismo hotelero',
    paint: {
      'fill-color': '#E65069',
      'fill-opacity': 0.5,
    },
  },

], 'Usos de suelo');

export default useCancunLandUse;
