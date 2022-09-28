import { Feature, FeatureCollection, Polygon } from "geojson";

export const convertToGeoJSON = (features: Feature<Polygon>[]): FeatureCollection<Polygon> => ({
  type: 'FeatureCollection',
  features,
});
