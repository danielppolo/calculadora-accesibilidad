import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Map from '../components/Map';

const contentful = require('contentful');

const client = contentful.createClient({
  space: 'f9qr8a787ywo',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function Home() {
  const [cities, setCities] = useState();
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState();
  const [data, setData] = useState({});

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
      setLoading(false)
    };
    fetchCities();
  }, []);

  const handleCityChange = async (bucket) => {
    if (bucket && !data[bucket]) {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${bucket}/main.json`);
        const responseData = await response.json();
        const properties = await fetch(`${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${bucket}/static.json`);
        const propertiesData = await properties.json();
        Object.keys(propertiesData).forEach((id) => {
          Object.assign(responseData[id].properties, propertiesData[id])
        })
        setData({
          ...data,
          [bucket]: responseData,
        });
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
    setCity(bucket);
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Map 
      onLoading={setLoading}
      city={city} 
      cities={cities} 
      data={data[city]} 
      onCityChange={handleCityChange} 
      />
    </>
  );
}
