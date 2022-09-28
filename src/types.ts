import { LngLatLike } from "mapbox-gl";

export type Scenario = {
  bucketName: string;
  name: string;
}

export type City = {
  name: string;
  coordinates: LngLatLike;
  active: boolean;
  bucketName: string;
  chart: number;
  scenarios: Array<{ fields: Scenario }>;
  color: string;
}

export type Legend = {
  title: string;
  intervals: {
    color: string;
    label: string;
  }[]
}