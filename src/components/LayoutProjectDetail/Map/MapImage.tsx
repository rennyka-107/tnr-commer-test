import isEmpty from "lodash.isempty";
import { useEffect, useState } from "react";
import { ImageOverlay, useMap } from "react-leaflet";

type Props = {
  url: string;
};

const MapImage = ({ url }: Props) => {
  const map = useMap();
  const [originBound, setOriginBound] = useState<any>(null);
  useEffect(() => {
    if (isEmpty(originBound)) {
      setOriginBound(map.getBounds());
    }
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.zoomControl.remove();
  }, [map]);

  useEffect(() => {
    if (!isEmpty(url) && !isEmpty(originBound)) {
      map.fitBounds(originBound);
    }
  }, [url, originBound]);

  if (!isEmpty(originBound)) {
    return <ImageOverlay bounds={originBound} url={url} />;
  }

  return <></>;
};

export default MapImage;
