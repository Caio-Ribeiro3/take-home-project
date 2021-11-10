import { LatLngExpression } from "leaflet";

export type GeoType = {
  properties: {
    uuid: string;
    color: string;
    info: {
      diameter: number;
      length: number;
    };
  };
  geometry: {
    coordinates: LatLngExpression[][];
  };
};
