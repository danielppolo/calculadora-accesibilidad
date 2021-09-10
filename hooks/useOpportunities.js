import useLayer from './useLayer';

const useOpportunities = (map, data, property) => {
  const values = data.map((item) => item.properties[property]);

  return useLayer()(map, data, property, Math.max(...values));
};

export default useOpportunities;
