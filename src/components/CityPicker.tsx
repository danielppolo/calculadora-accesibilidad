import React from 'react';
import { City } from 'src/types';
import Select from './Select';

interface CityPickerProps {
    cities?: City[];
    value?: string;
    onChange?: (city: string) => void;
}

function CityPicker({
  cities,
  value,
  onChange,
}: CityPickerProps) {
  return (
    <Select
      value={value}
      options={cities?.sort((a, b) => a.name.localeCompare(b.name)).map((ct) => ({
        label: ct.name,
        value: ct.code,
      })) ?? []}
      onChange={onChange}
      placeholder="Selecciona una ciudad"
    />
  );
}

export default CityPicker;
