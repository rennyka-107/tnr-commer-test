import L, { LatLngBoundsExpression } from "leaflet";
import isEmpty from "lodash.isempty";
import { useEffect, useRef, useState } from "react";
import { ImageOverlay, useMap } from "react-leaflet";
import { useDispatch } from "react-redux";
import { setResize } from "../../../../store/projectMapSlice";

type Props = {
  url: string;
};

const MapImage = ({ url }: Props) => {
  const map = useMap();
  const [originBound, setOriginBound] = useState<any>(null);
  const ref = useRef<any>();
  const dispatch = useDispatch();

  function handleResizeMap() {
    const bound = L.latLngBounds(
      [1.3*window.innerWidth, 1.3*window.innerWidth],
      [-1.3*window.innerWidth, -1.3*window.innerWidth]
    );
    setOriginBound(bound);
    dispatch(setResize(`resize ${window.innerWidth}`));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResizeMap);
    return () => {
      window.removeEventListener("resize", handleResizeMap);
    };
  }, []);

  useEffect(() => {
    setOriginBound(map.getBounds());
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
    return <ImageOverlay ref={ref} bounds={originBound} url={url} />;
  }

  return <></>;
};

export default MapImage;
