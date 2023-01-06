import { MapParamsState } from 'src/types';
import useConfig from './useConfig';

function useCurrentVisualization() {
  const { data: config } = useConfig();

  return ({ cityCode, visualizationCode }: MapParamsState) =>
    cityCode && visualizationCode
      ? config?.citiesDictionary?.[cityCode]?.visualizations.find(
          (visualization) => visualization.code === visualizationCode
        )
      : undefined;
}

export default useCurrentVisualization;
