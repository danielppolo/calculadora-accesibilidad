import { LngLatLike } from 'mapbox-gl';

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

export const NUMBER_OF_BUCKETS = 10;
export const CANCUN_COORDINATES: LngLatLike = [-86.851404, 21.161788];
export const MEXICO_COORDINATES: LngLatLike = [-102.918019, 24.244178];
