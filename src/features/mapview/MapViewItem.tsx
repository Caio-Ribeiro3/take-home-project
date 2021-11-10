import { memo, useState } from "react";
import { Polyline, Popup } from "react-leaflet";

import Table from "../../components/atoms/table/Table";

import { theme } from "../../components/constants";

import { GeoType } from "./types";

interface iProps {
  el: GeoType;
  colorBool: boolean;
}

const MapViewItem = memo((props: iProps) => {
  const { el, colorBool } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Polyline
      eventHandlers={{
        mouseover: () => {
          setIsHovered(true);
        },
        mouseout: () => {
          setIsHovered(false);
        },
      }}
      pathOptions={{
        color: colorBool ? el.properties.color : theme.primaryColor,
        opacity: isHovered ? 1 : 0.5,
      }}
      positions={el.geometry.coordinates}
    >
      <Popup>
        <Table
          fields={Object.entries({
            ...el.properties.info,
            uuid: el.properties.uuid,
          })}
        />
      </Popup>
    </Polyline>
  );
});

export default MapViewItem;
