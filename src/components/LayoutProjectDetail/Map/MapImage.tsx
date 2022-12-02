import L, { LatLngBoundsExpression } from "leaflet";
import isEmpty from "lodash.isempty";
import { useEffect, useRef, useState } from "react";
import { ImageOverlay, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setResize } from "../../../../store/projectMapSlice";
import { RootState } from "../../../../store/store";

type Props = {
  url: string;
};

const MapImage = ({ url }: Props) => {
  const map = useMap();
  const [originBound, setOriginBound] = useState<any>(null);
  const ref = useRef<any>();
  const dispatch = useDispatch();
  const Target = useSelector((state: RootState) => state.projectMap.Target);
  function handleResizeMap() {
    const bound = L.latLngBounds(
      // [1.3 * window.innerWidth, 1.3 * window.innerWidth],
      // [-1.3 * window.innerWidth, -1.3 * window.innerWidth]
      // [2 * (window.innerHeight - 150), 1.3 * window.innerWidth],
      // [-2 * (window.innerHeight - 150), -1.3 * window.innerWidth]
      [
        2 * (window.innerHeight - 150),
        (window.innerWidth <= 1024 ? 1.8 : 1.3) * window.innerWidth,
      ],
      [
        -2 * (window.innerHeight - 150),
        (window.innerWidth <= 1024 ? -1.8 : -1.3) * window.innerWidth,
      ]
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
      if (
        (!isEmpty(Target) && Target.type === "1" && !isEmpty(Target.imgMap)) ||
        isEmpty(Target)
      ) {
        map.fitBounds(originBound);
      }
    }
  }, [url, originBound, Target]);
  if (!isEmpty(originBound)) {
    return <ImageOverlay ref={ref} bounds={originBound} url={url} />;
  }

  return <></>;
};

export default MapImage;
