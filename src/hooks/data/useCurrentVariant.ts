import { MapParamsState } from 'src/context/mapParams';
import useConfig from './useConfig';

function useCurrentVariant() {
  const { data: config } = useConfig();

  return ({ cityCode, visualizationCode, variantCode }: MapParamsState) =>
    cityCode && visualizationCode && variantCode
      ? config?.[cityCode]?.visualizations
          .find((visualization) => visualization.code === visualizationCode)
          ?.variants?.find((variant) => variant.code === variantCode)
      : undefined;
}

export default useCurrentVariant;
