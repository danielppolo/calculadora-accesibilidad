import { MapParamsState } from 'src/types';
import useConfig from './useConfig';

function useCurrentCity() {
  const { data: config } = useConfig();

  return ({ cityCode }: MapParamsState) =>
    cityCode ? config?.citiesDictionary?.[cityCode] : undefined;
}

export default useCurrentCity;
