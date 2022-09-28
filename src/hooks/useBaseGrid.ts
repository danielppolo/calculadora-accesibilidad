import { useCallback } from 'react';
import { Feature, Polygon } from 'geojson';
import { convertToGeoJSON } from 'src/utils';
import { OPPORTUNITIES } from 'src/constants';
import { Map, Popup } from 'mapbox-gl';

const useBaseGrid = () => {
  const load = useCallback((map: Map, features: Feature<Polygon>[], id: string, popup: Popup) => {
    if (map && features && !map.getSource(id)) {
      const opportunityKeys = Object.keys(OPPORTUNITIES) as Array<keyof typeof OPPORTUNITIES>

      const filteredFeatures = features.map((feature: Feature<Polygon>) => ({
        ...feature,
        properties: {
          ...feature.properties,
          description: `
          <div>
            ${opportunityKeys.map((prop) => `<p><strong>${OPPORTUNITIES[prop]}</strong>: <span>${feature.properties?.[prop] ?? ''}</span></p>`).join('')}
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

      map.on('mousemove', id, (event) => {
        popup
          .setLngLat(event.lngLat)
          .setHTML(event.features?.[0].properties?.description)
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
