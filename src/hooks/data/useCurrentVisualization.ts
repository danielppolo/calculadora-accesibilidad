import { MapParamsState } from 'src/context/mapParams';
import useConfig from './useConfig';

function useCurrentVisualization() {
  const { data: config } = useConfig();

  return ({ cityCode, visualizationCode }: MapParamsState) =>
    cityCode && visualizationCode
      ? config?.[cityCode]?.visualizations.find(
          (visualization) => visualization.code === visualizationCode
        )
      : undefined;
}

export default useCurrentVisualization;
