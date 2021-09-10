import mapboxgl from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import data from '../data/cancunDictionary.json';
import useOpportunities from '../hooks/useOpportunities';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;

const CANCUN_COORDINATES = [-86.879, 21.1427];

const getLayers = (res, time) => {
  const walkIds = Object.keys(res).filter((id) => res[id].walk < time);
  const bikeIds = Object.keys(res).filter((id) => res[id].bike < time);
  const carIds = Object.keys(res).filter((id) => res[id].car < time);
  const walk = walkIds.map((id) => data[id]);
  const bike = bikeIds.map((id) => data[id]);
  const car = carIds.map((id) => data[id]);
  return { walk, bike, car };
};

function Map() {
  const [map, setMap] = useState(null);
  const [opportunity, setOpportunity] = useState('jobs_w');
  const [displayJobs, removeJobs] = useOpportunities(map, Object.values(data), 'jobs_w');
  const [displayEmpress, removeEmpress] = useOpportunities(map, Object.values(data), 'empress');
  const [displayClinics, removeClinics] = useOpportunities(map, Object.values(data), 'clinics');
  const [displaySchools, removeSchools] = useOpportunities(map, Object.values(data), 'escuels');

  useEffect(() => {
    setMap(new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: CANCUN_COORDINATES,
      zoom: 12,
    }));
  }, []);

  useEffect(() => {
    if (map && displayJobs) {
      map.on('load', () => {
        displayJobs();
      });
      // map.on('click', 'cancun', async (e) => {
      //   const id = e.features[0].properties.h3_ddrs
      //   const response =  await fetch(`http://localhost:3000/api/features/${id}`)
      //   const data = await response.json()
      //   const {walk, bike, car} = getLayers(data, 15)
      //   });
    }
  }, [map, displayJobs]);

  const handleSelectChange = (event) => {
    const op = event.currentTarget.value;
    switch (opportunity) {
      case 'jobs_w':
        removeJobs();
        break;
      case 'empress':
        removeEmpress();
        break;
      case 'clinics':
        removeClinics();
        break;
      case 'escuels':
        removeSchools();
        break;
      default:
        break;
    }
    switch (op) {
      case 'jobs_w':
        displayJobs();
        break;
      case 'empress':
        displayEmpress();
        break;
      case 'clinics':
        displayClinics();
        break;
      case 'escuels':
        displaySchools();
        break;
      default:
        break;
    }
    setOpportunity(op);
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

// map.addLayer({
//   'id': 'outline',
//   'type': 'line',
//   'source': 'cancun',
//   'layout': {},
//   'paint': {
//   'line-color': '#000',
//   'line-width': 1
//   }
//   });
