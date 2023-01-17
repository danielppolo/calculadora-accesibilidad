import { MapParamsState } from 'src/types';
import useConfig from './useConfig';

function useCurrentVariant() {
  const { data: config } = useConfig();

  return ({
    cityCode,
    visualizationCode,
    variantCode,
  }: Partial<MapParamsState>) =>
    cityCode && visualizationCode && variantCode
      ? config?.citiesDictionary?.[cityCode]?.visualizations
          .find((visualization) => visualization.code === visualizationCode)
          ?.variants?.find((variant) => variant.code === variantCode)
      : undefined;
}

export default useCurrentVariant;
