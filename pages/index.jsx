import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { OPPORTUNITIES } from '../constants';

const cityName = 'cancun'

export default function Home() {
  const [city, setCity] = useState();
  useEffect(() => {
    const fetchCity = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${cityName}/main.json`);
      const data = await response.json();
      Object.values(data).forEach((feature) => {
        feature.properties.description = `
          <div>
            ${Object.keys(OPPORTUNITIES).map(prop => `<p><strong>${OPPORTUNITIES[prop]}</strong>: <span>${feature.properties[prop]}</span></p>`).join('')}
          </div>
          `
      });
      setCity(data);
    };

    fetchCity();
  }, []);

  return (
    <>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!city}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <Map city="cancun" data={city || {}} />
</>
  );
}
