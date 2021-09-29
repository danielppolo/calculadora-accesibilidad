import { useCallback } from 'react';
import { convertToGeoJSON } from '../utils';
import { OPPORTUNITIES } from '../constants';

const useBaseGrid = (id) => {
  const load =  useCallback((map, features) => {
    if (map && features) {
      features.forEach((feature) => {
        feature.properties.description = `
          <div>
            ${Object.keys(OPPORTUNITIES).map(prop => `<p><strong>${OPPORTUNITIES[prop]}</strong>: <span>${feature.properties[prop]}</span></p>`).join('')}
          </div>
          `
      });
      map.addSource(id, {
        type: 'geojson',
        data: convertToGeoJSON(features), 
      });
  
      map.addLayer({
        id: id,
        type: 'fill',
        source: id,
        paint: {
          'fill-opacity': 0.7,
          'fill-color': 'transparent',
          'fill-outline-color': [
            'rgba',
            0,
            0,
            0,
            0.2,	
          ],
        },
      });
    }
  }, []);

  return {
    load, 
    layerName: id
  };
}

export default useBaseGrid;