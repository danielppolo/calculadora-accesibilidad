import { Feature, Polygon } from 'geojson';
import { useMemo } from 'react';
import count from 'src/utils/countFeatures';

const useCityData = (data?: Record<string, Feature<Polygon>>) => {
  const cityData = useMemo(() => {
    if (data) {
      const nextFeatures = Object.values(data);
      return {
        features: nextFeatures,
        metadata: {
          'Personal ocupado': count(nextFeatures, 'jobs_w'),
          Empresas: count(nextFeatures, 'empress'),
          Clínicas: count(nextFeatures, 'clinics'),
          Escuelas: count(nextFeatures, 'escuels'),
        },
      };
    }
    return {
      features: [],
      metadata: {
        'Personal ocupado': 0,
        Empresas: 0,
        Clínicas: 0,
        Escuelas: 0,
      },
    };
  }, [data]);

  return cityData;
};

export default useCityData;
