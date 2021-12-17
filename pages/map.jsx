import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Map from '../components/Map';
const contentful = require("contentful");

const client = contentful.createClient({
  space: "f9qr8a787ywo",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
});

const cityName = 'fonatur-tren-maya';

export default function Home() {
  const [cities, setCities] = useState();
  const [city, setCity] = useState();
  const [cityData, setCityData] = useState();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cities = await client.getEntries({
          content_type: 'city',
        })
        const cityData = {}
        cities.items.map(cty => cty.fields).filter(cty => !!cty.coordinates).forEach(cty => cityData[cty.bucketName] = cty)
        setCities(cityData)
      } catch(e) {
        console.log(e)
      }
    }
    fetchCities()
  }, []);

  const handleCityChange = async (bucket) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${bucket}/main.json`);
    const data = await response.json();
    setCity(bucket);
    setCityData(data);
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!cities}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Map city={city} cities={cities} data={cityData || {}} onCityChange={handleCityChange}/>
    </>
  );
}
