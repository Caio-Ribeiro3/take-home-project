import { FC, useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import Fab from "../../components/atoms/FAB/Fab";

import MapViewItem from "./MapViewItem";

import { getMapViewData } from "./api/mapview";

import { GeoType } from "./types";

const MapView: FC = () => {
  const [data, setData] = useState<GeoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [colorBool, setColorBool] = useState(false);

  const { componentsArray, centerAvg } = useMemo(() => {
    const centerAvg: {
      lat: Array<number>;
      long: Array<number>;
    } = { lat: [0, 0], long: [0, 0] };

    const componentsArray = data.map((el) => {
      el.geometry.coordinates.forEach(([lat, long]) => {
        centerAvg.lat[0] += Number(lat.toString());
        centerAvg.lat[1]++;
        centerAvg.long[0] += Number(long.toString());
        centerAvg.long[1]++;
      });
      return (
        <MapViewItem key={el.properties.uuid} el={el} colorBool={colorBool} />
      );
    });
    return {
      componentsArray,
      centerAvg: {
        lat: centerAvg.lat[0] / centerAvg.lat[1],
        long: centerAvg.long[0] / centerAvg.long[1],
      },
    };
  }, [data, colorBool]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { features } = await getMapViewData();
      setData(features);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading || !centerAvg.lat ? (
        <p>Loading...</p>
      ) : (
        <>
          <MapContainer
            center={[centerAvg.lat, centerAvg.long]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {componentsArray}
          </MapContainer>
          <Fab
            onClick={() => {
              setColorBool(!colorBool);
            }}
          >
            Toggle Color
          </Fab>
        </>
      )}
    </>
  );
};

export default MapView;
