import { City, Config } from 'src/types';
import getCities from 'src/adapters/contentful/getCities';
import { useQuery } from '@tanstack/react-query';
import queries from 'src/utils/queries';

const fetchConfig = async () => {
  const nextConfig: Config = {};
  const remoteConfig = await getCities();

  remoteConfig.forEach((city: City) => {
    nextConfig[city.code] = city;
  });
  return nextConfig;
};

function useConfig() {
  return useQuery({
    queryKey: queries.config.main.queryKey,
    queryFn: fetchConfig,
  });
}

export default useConfig;
