import L, { LatLngBoundsExpression } from "leaflet";
import isEmpty from "lodash.isempty";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import * as geojson from "geojson";
import dynamic from "next/dynamic";

type Props = {};

const DisplayLayers = dynamic(() => import("./DisplayLayers"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const CustomMap = dynamic(() => import("./CustomMap"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const MapImage = dynamic(() => import("./MapImage"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const Map = (props: Props) => {
  // const bounds: LatLngBoundsExpression = [
  //   [1400, 1400],
  //   [-1400, -1400],
  // ];
  const bounds: LatLngBoundsExpression = [
    [1.3 * window.innerWidth, 1.3 * window.innerWidth],
    [-1.3 * window.innerWidth, -1.3 * window.innerWidth],
  ];

  const [layerParent, setLayerParent] = useState<any>(null);
  const imgMap = useSelector((state: RootState) => state.projectMap.ImgMap);
  const ListLevel = useSelector((state: RootState) => state.projectMap.ListLevel);
  const GeoJsonData = useSelector(
    (state: RootState) => state.projectMap.GeoJsonData
  );
  const Target = useSelector((state: RootState) => state.projectMap.Target);

  useEffect(() => {
    if (!isEmpty(Target) && !isEmpty(Target.map) && Target.level !== ListLevel.length - 1) {
      const formatmap = JSON.parse(Target.map);
      const features = [];
      features.push(formatmap);
      const dataLayer = new L.GeoJSON({
        type: "FeatureCollection",
        features: [formatmap],
      } as geojson.GeoJsonObject);
      dataLayer.eachLayer((layer: any) => {
        setLayerParent(layer);
        return;
      });
    } else {
      setLayerParent(null);
    }
  }, [Target]);

  return (
    <CustomMap bounds={bounds} style={{ height: "100%" }}>
      <DisplayLayers data={GeoJsonData} layerParent={layerParent} />
      {imgMap && <MapImage url={imgMap} />}
    </CustomMap>
  );
};

export default Map;
