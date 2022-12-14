import { MapParamsState } from 'src/context/mapParams';
import useConfig from './useConfig';

function useCurrentCity() {
  const { data: config } = useConfig();

  return ({ cityCode }: MapParamsState) =>
    cityCode ? config?.[cityCode] : undefined;
}

export default useCurrentCity;
