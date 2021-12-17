import { useMemo } from 'react';

const count = (array, property) => array.reduce((acc, item) => acc + item.properties[property], 0);

const useCityData = (data) => {
  const cityData = useMemo(() => {
    if (data) {
      const nextFeatures = Object.values(data);
      return {
        features: nextFeatures,
        metadata: {
          'Personal ocupado': count(nextFeatures, 'jobs_w'),
          Empresas: count(nextFeatures, 'empresas'),
          Clínicas: count(nextFeatures, 'clinicas'),
          Escuelas: count(nextFeatures, 'escuelas'),
          'Zonas turísticas': count(nextFeatures, 'destinos'),
        },
      };
    }
    return {
      features: [],
      metadata: {},
    };
  }, [data]);
  return cityData;
};

export default useCityData;
