import { Feature, FeatureCollection, Polygon } from 'geojson';

const convertToGeoJSON = (
  features: Feature<Polygon>[]
): FeatureCollection<Polygon> => ({
  type: 'FeatureCollection',
  features,
});

export default convertToGeoJSON;
