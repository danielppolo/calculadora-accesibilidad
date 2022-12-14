import { useQuery } from '@tanstack/react-query';
import queries from 'src/utils/queries';
import { useMapParams } from 'src/context/mapParams';
import { Feature, Polygon } from 'geojson';
import { useMap } from 'src/context/map';
import getGridId from 'src/utils/getGridId';
import convertToGeoJSON from 'src/utils/convertToGeoJSON';

function useGridGeojson() {
  const map = useMap();
  const { current } = useMapParams();
  const { cityCode, gridCode } = current;

  const query = useQuery({
    ...queries.grids.geojson({ cityCode, gridCode }),
    enabled: !!cityCode && !!gridCode,
    select: (data) =>
      data &&
      Object.keys(data).map((featureId) => ({
        ...data[featureId],
        properties: {
          id: featureId,
        },
      })),
    onSuccess: (features) => {
      if (cityCode && gridCode) {
        const id = getGridId(cityCode, gridCode);

        if (features?.length && !map.getSource(id)) {
          map.addSource(id, {
            type: 'geojson',
            data: convertToGeoJSON(features),
          });

          map.addLayer({
            id,
            type: 'fill',
            source: id,
            paint: {
              'fill-opacity': 0.7,
              'fill-color': 'transparent',
              'fill-outline-color': ['rgba', 0, 0, 0, 0.1],
            },
          });
        }
      }
    },
  });

  return {
    ...query,
    data: query.data as Feature<Polygon>[] | undefined,
  };
}

export default useGridGeojson;
