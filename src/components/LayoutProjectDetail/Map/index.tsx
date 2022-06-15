import { LatLngBoundsExpression } from "leaflet";
import React from "react";
import CustomMap from "./CustomMap";
import DisplayLayers from "./DisplayLayers";
import MapImage from "./MapImage";

type Props = {};

const Map = (props: Props) => {
  const bounds: LatLngBoundsExpression = [
    [1400, 1400],
    [-1400, -1400],
  ];
  const imgMap =
    "https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg";
  return (
    <CustomMap bounds={bounds} style={{ height: "100%" }}>
      <DisplayLayers
        data={{
          type: "FeatureCollection",
          features: [],
        }}
        layerParent={null}
      />
      {imgMap && (
        <MapImage
          //   url={
          //     !isEmpty(parent) && !isEmpty(parent.imgMap)
          //       ? parent.imgMap
          //       : (imgMap as string)
          //   }
          url={imgMap}
        />
      )}
    </CustomMap>
  );
};

export default Map;
