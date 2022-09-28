import { Feature } from "geojson";

const count = (array: Feature[], property: string) => array.reduce((acc, item) => acc + (item?.properties?.[property] ?? 0), 0);

export default count;
