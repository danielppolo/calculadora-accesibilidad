import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import Map from '../components/Map';

const contentful = require('contentful');

const client = contentful.createClient({
  space: 'f9qr8a787ywo',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function Home() {
  const [cities, setCities] = useState();
  const [city, setCity] = useState();
  const [data, setData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cmsCities = await client.getEntries({
          content_type: 'city',
        });
        const cityData = {};
        cmsCities.items
          .map((cty) => cty.fields)
          .filter((cty) => !!cty.coordinates)
          .forEach((cty) => {
            cityData[cty.bucketName] = cty;
          });
        setCities(cityData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCities();
  }, []);

  const handleCityChange = async (bucket) => {
    if (bucket && !data[bucket]) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${bucket}/main.json`);
        const responseData = await response.json();
        setData({
          ...data,
          [bucket]: responseData,
        });
      } catch (e) {
        console.log(e);
      }
    }
    setCity(bucket);
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!cities}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Map city={city} cities={cities} data={data[city]} onCityChange={handleCityChange} />
    </>
  );
}
