import mapboxgl from 'mapbox-gl';
import React, { useEffect, useState } from 'react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;

const CANCUN_COORDINATES = [-86.879, 21.1427];
const opportunities = ['jobs_w', 'empress', 'clinics', 'escuels'];
const timeSteps = [15, 30, 60];
const mediums = ['car', 'bike', 'walk'];

const convertToGeoJSON = (features) => ({
  type: 'FeatureCollection',
  features,
});

const createLayer = (id, map, features, property, max, visibility) => {
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
      visibility,
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
  const [hexagonId, setHexagonId] = useState();

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
        createLayer(opportunity, mapInstance, features, opportunity, Math.max(...values), 'none');
      });
    });

    setMap(mapInstance);
  }, []);

  useEffect(() => {
    if (map && layerId) {
      map.on('click', layerId, async (e) => {
        const featureId = e.features[0].properties.h3_ddrs;

        // Clear previoyus isochrone
        if (hexagonId) {
          mediums.forEach((medium) => {
            timeSteps.forEach((timeStep) => {
              map.removeLayer(`${hexagonId}-${medium}-${timeStep}`);
            });
          });
        }

        // Fetch data
        const response = await fetch(`/api/cities/${city}/features/${featureId}`);
        const text = await response.text();
        const json = JSON.parse(text);

        // Create 9 isochrone variant layers
        mediums.forEach((medium, i) => {
          timeSteps.forEach((timeStep) => {
            const filteredIds = Object.keys(json).filter((id) => json[id][i] < timeStep);
            const hexagons = filteredIds.map((id) => ({
              ...data[id],
              properties: {
                ...data[id].properties,
                [medium]: json[id][1],
              },
            }));
            const max = Math.max(...hexagons.map((item) => item.properties[medium]));
            createLayer(`${featureId}-${medium}-${timeStep}`, map, hexagons, medium, max, 'none');
          });
        });
        // Hide all opportunity layers
        opportunities.forEach((opportunity) => {
          map.setLayoutProperty(opportunity, 'visibility', 'none');
        });
        // Show default isochrone
        map.setLayoutProperty(`${featureId}-car-60`, 'visibility', 'visible');

        // Set active IDS
        setLayerId(`${featureId}-car-60`);
        setHexagonId(featureId);
      });
    }
  }, [map, layerId, hexagonId]);

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
