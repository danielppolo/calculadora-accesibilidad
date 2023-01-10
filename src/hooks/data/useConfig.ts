import { City, Config } from 'src/types';
import getConfig from 'src/adapters/contentful/getConfig';
import { useQuery } from '@tanstack/react-query';
import queries from 'src/utils/queries';
import { useMapboxTilesetManager } from 'src/context/mapboxTilesetManager';

type CustomConfig = Config & {
  citiesDictionary: Record<City['code'], City>;
};

const fetchConfig = async () => {
  const remoteConfig = await getConfig();
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
  const { show } = useMapboxTilesetManager();
  return useQuery({
    queryKey: queries.config.main.queryKey,
    queryFn: fetchConfig,
    onSuccess: (config) => {
      config?.enabledMapboxTilesets?.forEach((tileset) => {
        show(tileset);
      });
    },
  });
}

export default useConfig;
