import { useQuery } from '@tanstack/react-query';
import queries from 'src/utils/queries';
import { useMapParams } from 'src/context/mapParams';

function useGrid() {
  const {
    current: { cityCode, gridCode },
  } = useMapParams();
  return useQuery({
    ...queries.grids.dictionary({ cityCode, gridCode }),
    enabled: !!cityCode && !!gridCode,
    select: (data) => {
      Object.keys(data).forEach((featureId) => {
        if (data?.[featureId]?.properties) {
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          data[featureId].properties.id = featureId;
        }
      });

      return data;
    },
  });
}

export default useGrid;
