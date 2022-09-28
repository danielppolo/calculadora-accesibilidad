import { Map } from 'mapbox-gl';
import useLayer from './useLayer';

const useCityBoundaries = () => {
  return (map: Map) => {
    map.addSource('zonas-metropolitanas', {
      type: 'vector',
      url: 'mapbox://daniel-itdp.19rfoakq',
      maxzoom: 16,
    });
    map.addLayer({
      id: 'zonas-metropolitanas',
      type: 'line',
      source: 'zonas-metropolitanas',
      'source-layer': 'Zonas_Metropolitanas-cynvun',
      paint: {
        'line-color': '#000',
        'line-width': 2,
        'line-opacity': 0.25,
      },
    });
  }
}

export default useCityBoundaries;
