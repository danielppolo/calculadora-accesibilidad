import { useState } from 'react';

const convertToGeoJSON = (features) => ({
  type: 'FeatureCollection',
  features,
});

const useLayerCreate = () => {
  const [layers] = useState({});
  const [current, setCurrent] = useState();
  const addLayer = ({
    map, id, features, property, maxValue, visible,
  }) => {
    if (map && !(id in layers)) {
      console.log('addLayer', id);
      map.addSource(id, {
        type: 'geojson',
        data: convertToGeoJSON(features), // 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_110m_admin_1_states_provinces_shp.geojson'
      });
      map.addLayer({
        id,
        type: 'fill',
        source: id,
        filter: ['>', ['get', property], 0],
        layout: {
          visibility: visible ? 'visible' : 'none',
        },
        paint: {
          'fill-color': [
            'rgba',
            0,
            0,
            ['+', 50, ['round', ['/', ['*', 205, ['get', property]], maxValue]]],
            0.7,
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
      layers[id] = true;
      if (visible) {
        setCurrent(id);
      }
    }
  };

  const showLayer = (map, id) => {
    console.log(layers, id, id in layers, map)
    if (id in layers && map) {
      Object.keys(layers).forEach((layerId) => {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      });
      console.log('show', id);
      map.setLayoutProperty(id, 'visibility', 'visible');
      setCurrent(id);
    }
  };

  const hideLayer = (map, id) => {
    if (id in layers && map) {
      map.setLayoutProperty(id, 'visibility', 'none');
    }
  };

  return {
    state: layers,
    add: addLayer,
    hide: hideLayer,
    show: showLayer,
    current,
  };
};
export default useLayerCreate;
