import { GeoType } from "../types";
import { BASE_URL } from "./constants";

export const getMapViewData = async (): Promise<{ features: GeoType[] }> => {
  const result = await fetch(`${BASE_URL}/mapview`);
  const json = await result.json();
  return json;
};
