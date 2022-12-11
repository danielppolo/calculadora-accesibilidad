import React from 'react';
import { useMapParams } from 'src/context/mapParams';
import useConfig from 'src/hooks/data/useConfig';
import useCurrentCity from 'src/hooks/data/useCurrentCity';
import Select from './Select';

function CityPicker() {
  const { data: config } = useConfig();
  const currentCity = useCurrentCity();
  const { onCityChange } = useMapParams();
  const cities = config ? Object.values(config) : [];
  const sortedCities =
    cities?.sort((a, b) => a.name.localeCompare(b.name)) || [];

  return (
    <Select
      label="Ciudad"
      value={currentCity?.name}
      options={
        sortedCities.map((city) => ({
          label: city.name,
          value: city.code,
          category: city.country.name,
        })) ?? []
      }
      onChange={onCityChange}
      placeholder="Selecciona una ciudad"
    />
  );
}

export default CityPicker;
