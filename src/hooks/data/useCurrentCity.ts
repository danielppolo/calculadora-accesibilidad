import { MapParamsState } from 'src/types';
import useConfig from './useConfig';

function useCurrentCity() {
  const { data: config } = useConfig();

  return ({ cityCode }: MapParamsState) =>
    cityCode ? config?.[cityCode] : undefined;
}

export default useCurrentCity;