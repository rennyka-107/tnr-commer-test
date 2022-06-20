import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L, { LatLngBoundsExpression } from "leaflet";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  bounds: LatLngBoundsExpression;
  style?: React.CSSProperties;
};

const CustomMap = ({ children, bounds, style }: Props) => {
  return (
    <MapContainer
      attributionControl={false}
      className="map"
      crs={L.CRS.Simple}
      bounds={bounds}
      minZoom={-2}
      style={style}
      maxBounds={[
        [window.innerWidth, window.innerWidth],
        [-window.innerWidth, -window.innerWidth],
      ]}
      scrollWheelZoom={false}
    >
      {children}
    </MapContainer>
  );
};

export default CustomMap;
