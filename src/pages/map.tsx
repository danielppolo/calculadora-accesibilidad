import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Map from 'src/components/Map';
import { City } from 'src/types';
import { Feature, Polygon } from 'geojson';
import getCities from 'src/adapters/contentful/getCities';

type UUID = string;
type FeatureDictionary = Record<UUID, Feature<Polygon>>
type CityDictionary = Record<City['code'], City>
type MapsData = Record<City['code'], FeatureDictionary>

export default function Home() {
  const [cityDictionary, setCityDictionary] = useState<CityDictionary>({});
  const [loading, setLoading] = useState(true);
  const [currentCityCode, setCurrentCityCode] = useState<City['code'] | undefined>();
  const [data, setData] = useState<MapsData>({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const nextCityDictionary: CityDictionary = {};
        const contentfulCities = await getCities();

        contentfulCities.forEach((city: City) => {
          nextCityDictionary[city.code] = city;
        });
        setCityDictionary(nextCityDictionary);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchCities();
  }, []);

  const handleCityChange = async (bucket?: string) => {
    if (bucket && !data[bucket]) {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${bucket}/main.json`,
        );
        const responseData = await response.json();
        const properties = await fetch(
          `${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${bucket}/static.json`,
        );
        const propertiesData = await properties.json();
        Object.keys(propertiesData).forEach((id) => {
          Object.assign(responseData[id].properties, propertiesData[id]);
        });

        setData({
          ...data,
          [bucket]: responseData,
        });
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
    setCurrentCityCode(bucket);
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
        city={currentCityCode}
        cities={cityDictionary}
        data={currentCityCode ? data[currentCityCode] : undefined}
        onCityChange={handleCityChange}
      />
    </>
  );
}
