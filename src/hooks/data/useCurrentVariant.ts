import { MapParamsState } from 'src/types';
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
