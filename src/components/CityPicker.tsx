import React from 'react';
import { City } from 'src/types';
import Select from './Select';

interface CityPickerProps {
  cities?: City[];
  value?: string;
  onChange?: (city: string) => void;
}

function CityPicker({ cities, value, onChange }: CityPickerProps) {
  const sortedCities =
    cities?.sort((a, b) => a.name.localeCompare(b.name)) || [];

  return (
    <Select
      label="Ciudad"
      value={value}
      options={
        sortedCities.map((city) => ({
          label: city.name,
          value: city.code,
          category: city.country.name,
        })) ?? []
      }
      onChange={onChange}
      placeholder="Selecciona una ciudad"
    />
  );
}

export default CityPicker;
