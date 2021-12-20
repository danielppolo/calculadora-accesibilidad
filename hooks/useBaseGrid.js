import { useCallback } from 'react';
import { Popup } from 'mapbox-gl';
import { convertToGeoJSON } from '../utils';
import { OPPORTUNITIES } from '../constants';

const popup = new Popup({
  className: 'black-popup',
  closeButton: false,
  closeOnClick: false,
});

const useBaseGrid = () => {
  const load = useCallback((map, features, id) => {
    if (map && features) {
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
