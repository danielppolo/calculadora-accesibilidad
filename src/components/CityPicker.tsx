import React, { memo } from 'react';
import { useMapParams } from 'src/context/mapParams';
import useConfig from 'src/hooks/data/useConfig';
import useCurrentCity from 'src/hooks/data/useCurrentCity';
import { Select } from 'antd';

function CityPicker() {
  const { data: config } = useConfig();
  const getCurrentCity = useCurrentCity();
  const { onCityChange, current } = useMapParams();
  const currentCity = getCurrentCity(current);
  const cities = config?.cities ?? [];
  const sortedCities = cities.sort((a, b) => a.name.localeCompare(b.name));

  const countriesDict: Record<string, any> = sortedCities.reduce(
    (acc, city) => {
      if (city?.country?.code && !acc[city.country.code]) {
        acc[city.country.code] = {
          label: city.country.name,
          options: [],
        };
      }

      acc[city.country.code].options.push({
        label: city.name,
        value: city.code,
      });

      return acc;
    },
    {} as Record<string, any>
  );

  return (
    <Select
      size="large"
      showSearch
      defaultValue={currentCity?.name}
      style={{ width: '100%' }}
      onChange={onCityChange}
      value={currentCity?.name}
      options={Object.values(countriesDict)}
      placeholder="Selecciona una ciudad"
      allowClear
    />
  );
}

export default memo(CityPicker);
