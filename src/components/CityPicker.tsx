import React, { memo, useMemo } from 'react';
import { useMapParams } from 'src/context/mapParams';
import useConfig from 'src/hooks/data/useConfig';
import useCurrentCity from 'src/hooks/data/useCurrentCity';
import { Select } from 'antd';
import { useIntl } from 'react-intl';

type CityDictionary = Record<
  string,
  {
    label: string;
    options: { label: string; value: string }[];
  }
>;

function CityPicker() {
  const intl = useIntl();
  const { data: config } = useConfig();
  const getCurrentCity = useCurrentCity();
  const { onCityChange, current } = useMapParams();
  const currentCity = getCurrentCity(current);

  const countriesDict = useMemo(() => {
    const activeCities =
      config?.cities?.filter((visualization) => visualization.active) ?? [];
    const sortedCities = activeCities.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return sortedCities.reduce((acc: CityDictionary, city) => {
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
    }, {});
  }, [config?.cities]);

  return (
    <Select
      size="large"
      showSearch
      defaultValue={currentCity?.name}
      style={{ width: '100%' }}
      onChange={onCityChange}
      value={currentCity?.name}
      options={Object.values(countriesDict)}
      placeholder={intl.formatMessage({
        defaultMessage: 'Selecciona una ciudad',
        id: 'bGUdPV',
      })}
      allowClear
    />
  );
}

export default memo(CityPicker);
