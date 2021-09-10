const convertToGeoJSON = (features) => ({
  type: 'FeatureCollection',
  features,
});

const useLayer = () => (map, features, property, max) => {
  map.addSource(property, {
    type: 'geojson',
    data: convertToGeoJSON(features), // 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_110m_admin_1_states_provinces_shp.geojson'
  });
  map.addLayer({
    id: property,
    type: 'fill',
    source: property,
    filter: ['>', ['get', property], 0],
    layout: {
      visibility: 'none',
    },
    paint: {
      'fill-color': [
        'rgba',
        0,
        0,
        ['+', 50, ['round', ['/', ['*', 205, ['get', property]], max]]],
        0.8,
      ],
      'fill-outline-color': [
        'rgba',
        0,
        0,
        0,
        0,
      ],
    },
  });
};

export default useLayer;
