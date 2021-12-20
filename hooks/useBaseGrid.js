import { useCallback } from 'react';
import { convertToGeoJSON } from '../utils';
import { OPPORTUNITIES } from '../constants';

const useBaseGrid = () => {
  const load = useCallback((map, features, id, popup) => {
    if (map && features && !map.getSource(id)) {
      const filteredFeatures = features.map((feature) => ({
        ...feature,
        properties: {
          ...feature.properties,
          description: `
          <div>
            ${Object.keys(OPPORTUNITIES).map((prop) => `<p><strong>${OPPORTUNITIES[prop]}</strong>: <span>${feature.properties[prop]}</span></p>`).join('')}
          </div>
          `,
        },
      }));
      map.addSource(id, {
        type: 'geojson',
        data: convertToGeoJSON(filteredFeatures),
      });

      map.addLayer({
        id,
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
            0.1,
          ],
        },
      });

      map.on('mousemove', id, (e) => {
        popup
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.description)
          .addTo(map);
      });
      map.on('mouseleave', id, () => {
        popup.remove();
      });
    }
  }, []);

  return {
    load,
  };
};

export default useBaseGrid;
