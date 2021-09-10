import { useCallback } from 'react';

const convertToGeoJSON = (features) => ({
  type: 'FeatureCollection',
  features,
});

const usePolygons = (map, features, id, color) => {
  const set = useCallback(
    () => {
      map.addSource(id, {
        type: 'geojson',
        data: convertToGeoJSON(features), // 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_110m_admin_1_states_provinces_shp.geojson'
      });
      map.addLayer({
        id,
        type: 'fill',
        source: id, // reference the data source
        layout: {},
        paint: {
          'fill-color': color, // blue color fill
          'fill-opacity': 0.5,
        },
      });
    },
    [map, features, id, color],
  );

  const remove = useCallback(
    () => {
      map.removeLayer(id);
      map.removeSource(id);
    },
    [map, id],
  );
  return [set, remove];
};

export default usePolygons;
