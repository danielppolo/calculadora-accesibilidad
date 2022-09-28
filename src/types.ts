import { LngLatLike } from "mapbox-gl";

export type City = {
  name: string;
  coordinates: LngLatLike;
  active: boolean;
  bucketName: string;
  chart: number;
  scenarios: string[];
  color: string;
}