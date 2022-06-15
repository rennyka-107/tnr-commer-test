import { useEffect } from "react";
import { ImageOverlay, useMap } from "react-leaflet";

type Props = {
  url: string;
};

const MapImage = ({ url }: Props) => {
  const map = useMap();
  useEffect(() => {
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.zoomControl.remove();
  }, [map]);
  return <ImageOverlay bounds={map.getBounds()} url={url} />;
};

export default MapImage;
