import React, {
  useEffect, useState,
} from 'react';
import mapboxgl from 'mapbox-gl';
import {
  MEXICO_COORDINATES,
} from 'src/constants';
import useLayerManager from 'src/hooks/useLayerManager';
import useMap from 'src/hooks/useMap';
import {
  City, CityDictionary, FeatureDictionary,
} from 'src/types';
import getCities from 'src/adapters/contentful/getCities';
import { getGrid, getVisualization } from 'src/utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import MapLayer from './MapLayer';

type Code = string;

type MapsData = Record<City['code'], {
  grids: Record<Code, FeatureDictionary>,
  visualizations: Record<Code, Record<string, Record<Code, any>>>,
}>;

function Map() {
  const [map, mapLoaded] = useMap({ center: MEXICO_COORDINATES });
  const [cityDictionary, setCityDictionary] = useState<CityDictionary>({});
  const [loading, setLoading] = useState(true);
  const [currentCity, setCurrentCityCode] = useState<
    City['code'] | undefined
  >();
  const [data, setData] = useState<MapsData>({});

  useEffect(() => {
    const fetchCities = async () => {
      const nextCityDictionary: CityDictionary = {};
      const contentfulCities = await getCities();

      contentfulCities.forEach((city: City) => {
        nextCityDictionary[city.code] = city;
      });
      setCityDictionary(nextCityDictionary);
      setLoading(false);
    };

    fetchCities();
  }, []);

  const handleCityChange = async (cityCode?: string) => {
    if (cityCode && !data[cityCode]) {
      setLoading(true);
      const { defaultVisualization } = cityDictionary[cityCode];
      if (defaultVisualization) {
        const defaultVariantCode = defaultVisualization?.defaultVariant?.code;
        const defaultGridCode = defaultVisualization?.grid?.code;
        const grid = await getGrid(cityCode, defaultGridCode);
        const defaultVisualizationData = await getVisualization(
          cityCode,
          defaultVisualization.code,
          defaultVariantCode,
        );
        console.log(defaultVisualizationData);
        // Object.keys(propertiesData).forEach((id) => {
        //   Object.assign(grid[id].properties, propertiesData[id]);
        // });

        setData({
          ...data,
          [cityCode]: grid,
        });
      }

      setLoading(false);
    }
    setCurrentCityCode(cityCode);
  };
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div id="map" className="w-screen h-screen" />
      {
        map && mapLoaded && (
        <MapLayer
          map={map}
          city={currentCity}
          cities={cityDictionary}
          grid={currentCity ? data[currentCity] : undefined}
          onLoading={setLoading}
          onCityChange={handleCityChange}
        />
        )
      }
    </>
  );
}

export default Map;
