import { City, Config } from 'src/types';
import { useQuery } from '@tanstack/react-query';
import queries from 'src/utils/queries';
import { useMapboxTilesetManager } from 'src/context/mapboxTilesetManager';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import { BASE_LAYER_ID, DEFAULT_LOCALE } from 'src/constants';
import { useRouter } from 'next/router';
import remoteConfig from 'src/adapters/config';

type CustomConfig = Config & {
  citiesDictionary: Record<City['code'], City>;
};

const fetchConfig = async (locale: string) => {
  const nextConfig: CustomConfig = {
    ...remoteConfig,
    citiesDictionary: {},
  };

  remoteConfig.cities.forEach((city: City) => {
    nextConfig.citiesDictionary[city.code] = city;
  });
  return nextConfig;
};

function useConfig() {
  const { locale, defaultLocale } = useRouter();
  const { show } = useMapboxTilesetManager();
  const { add } = useMapboxLayerManager();
  return useQuery({
    queryKey: queries.config.main({
      locale: locale ?? defaultLocale ?? DEFAULT_LOCALE,
    }).queryKey,
    queryFn: () => fetchConfig(locale ?? defaultLocale ?? DEFAULT_LOCALE),
    onSuccess: (config) => {
      add({
        id: BASE_LAYER_ID,
        features: [],
        property: 'city',
        values: [],
        visible: false,
        maxValue: 0,
        legendTitle: '',
      });
      config?.enabledMapboxTilesets?.forEach((tileset) => {
        show(tileset);
      });
    },
  });
}

export default useConfig;
