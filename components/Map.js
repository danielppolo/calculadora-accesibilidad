import mapboxgl from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import useLayer from '../hooks/useLayer';
import useOpportunities from '../hooks/useOpportunities';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;

const CANCUN_COORDINATES = [-86.879, 21.1427];
const opportunities = ['jobs_w', 'empress', 'clinics', 'escuels'];

const convertToGeoJSON = (features) => ({
  type: 'FeatureCollection',
  features,
});

const createLayer = (map, features, property, max) => {
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

function Map({ city, data }) {
  const features = Object.values(data);
  const [map, setMap] = useState(null);
  const [layerId, setLayerId] = useState();

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: CANCUN_COORDINATES,
      zoom: 12,
    });

    mapInstance.on('load', () => {
      opportunities.forEach((opportunity) => {
        const values = features.map((item) => item.properties[opportunity]);
        createLayer(mapInstance, features, opportunity, Math.max(...values));
      });
    });

    setMap(mapInstance);
  }, []);

  // useEffect(() => {
  //   if (map && displayJobs) {
  //     map.on('load', () => {
  //       displayJobs();
  //     });
  //   }
  // }, [map, displayJobs]);

  useEffect(() => {
    if (map && layerId) {
      console.log(layerId);
      map.on('click', layerId, async (e) => {
        const response = await fetch(`/api/cities/${city}/features/${e.features[0].properties.h3_ddrs}`);
        const text = await response.text();
        const json = JSON.parse(text);
        const walkIds = Object.keys(json).filter((id) => json[id][1] < 60);
        const walk = walkIds.map((id) => ({
          ...data[id],
          properties: {
            ...data[id].properties,
            walk_time: json[id][1],
          },
        }));
        console.log(walk);
        const [set] = createLayer(map, walk, 'walk_time', Math.max(...walk.map((item) => item.properties.walk_time)));
        set();
        // const { walk, bike, car } = getLayers(data, 15);
      });
    }
  }, [map, layerId]);

  const handleSelectChange = (event) => {
    const nextOpportunity = event.currentTarget.value;
    opportunities.forEach((opportunity) => {
      map.setLayoutProperty(opportunity, 'visibility', opportunity === nextOpportunity ? 'visible' : 'none');
    });
    setLayerId(nextOpportunity);
  };

  return (
    <>
      <div style={{ display: 'fixed' }}>
        <select onChange={handleSelectChange} name="opportinuty">
          <option name="" id="" value="jobs_w">jobs_w</option>
          <option name="" id="" value="empress">empress</option>
          <option name="" id="" value="clinics">clinics</option>
          <option name="" id="" value="escuels">escuels</option>
        </select>
      </div>
      <div id="map" className="w-screen h-screen" />
    </>
  );
}

export default Map;
