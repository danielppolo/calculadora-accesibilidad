import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import DirectionsCarFilled from '@mui/icons-material/DirectionsCarFilled';
import React from 'react';
import { LngLatLike } from 'mapbox-gl';

export const VISUALIZATIONS = {
  opportunities: 'Oportunidades por hexágono',
  reachability: 'Oportunidades alcanzables dentro de cada hexágono',
  isochrones: 'Área alcanzable por medio de transporte',
};

export const OPPORTUNITY_TIMEFRAMES = [15, 30, 60] as const;

export const TIMEFRAMES = [30, 60, 120] as const;

export const COLORS: Record<string, [string, string]> = {
  green: ['#54AC59', '#346B37'],
  blue: ['#307DC6', '#112D47'],
  red: ['#DA546F', '#59232E'],
  yellow: ['#F1BB43', '#735920'],
  aqua: ['#43C6CB', '#194B4D'],
  pink: ['#FF9DE1', '#402838'],
  orange: ['#FE8840', '#804520'],
  purple: ['#7054BC', '#251C3D'],
};

export const TRANSPORTS = [
  'caminando',
  'bicicleta',
  'bus_actual',
  'automovil',
] as const;

export const TRANSPORT_TRANSLATIONS = {
  caminando: 'Caminando',
  bicicleta: 'Bicicleta',
  bus_actual: 'Transporte Público',
  automovil: 'Automóvil',
};

export const TRANSPORT_COLORS = {
  caminando: 'aqua',
  bicicleta: 'green',
  bus_actual: 'pink',
  automovil: 'purple',
} as const;

export const TRANSPORT_ICONS = {
  caminando: <DirectionsWalkIcon fontSize="small" />,
  bicicleta: <DirectionsBikeIcon fontSize="small" />,
  bus_actual: <DirectionsBusFilledIcon fontSize="small" />,
  automovil: <DirectionsCarFilled fontSize="small" />,
};

export const OPPORTUNITIES = {
  jobs_w: 'Personal ocupado',
  empress: 'Empresas',
  clinics: 'Clínicas',
  escuels: 'Escuelas',
};
export const NUMBER_OF_BUCKETS = 10;
export const CANCUN_COORDINATES: LngLatLike = [-86.851404, 21.161788];
export const MEXICO_COORDINATES: LngLatLike = [-102.918019, 24.244178];
