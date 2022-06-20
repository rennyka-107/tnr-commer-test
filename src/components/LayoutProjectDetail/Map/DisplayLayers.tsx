import { useEffect, useRef } from "react";
import { FeatureGroup, useMap } from "react-leaflet";
import L, { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import isEmpty from "lodash.isempty";
import { createLockIcon, getBoundsLockIcon } from "utils/leafletHelper";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setTargetShape } from "../../../../store/projectMapSlice";

type Props = {
  data: any;
  layerParent: any;
};

const DisplayLayers = ({ data, layerParent }: Props) => {
  const map = useMap();
  const ref = useRef<any>();
  const dispatch = useDispatch();
  const Target = useSelector((state: RootState) => state.projectMap.Target);
  function fetchLayer() {
    ref?.current?.clearLayers();
    fetchLayerParent();
    let dataLayer = new L.GeoJSON(data);
    dataLayer.eachLayer((layer: any) => {
      const oldLatLng = layer.feature.properties.radius
        ? layer._latlng
        : layer.getLatLngs()[0];
      const newLatLng = layer.feature.properties.radius
        ? {
            lat: (oldLatLng.lat * 0.5 * window.innerWidth) / 700,
            lng: (oldLatLng.lng * 0.5 * window.innerWidth) / 700,
          }
        : oldLatLng.map((ll: any) => ({
            lat: (ll.lat * 0.5 * window.innerWidth) / 700,
            lng: (ll.lng * 0.5 * window.innerWidth) / 700,
          }));
      const newLayer = layer.feature.properties.radius
        ? new L.Circle(
            newLatLng,
            (layer.feature.properties.radius * 0.5 * window.innerWidth) / 700
          )
        : new L.Polygon(newLatLng as LatLngExpression[]);

      ref?.current?.addLayer(newLayer);
      newLayer.setStyle({
        stroke: false,
        fillOpacity: 0,
      });
      let svgIconLayer = null;
      if (layer.feature.properties.lock) {
        svgIconLayer = new L.SVGOverlay(
          createLockIcon(),
          getBoundsLockIcon(newLayer)
        );
      }
      newLayer.on("click", function (e: any) {
        dispatch(
          setTargetShape({
            id: layer.feature.properties.id,
            level: !isEmpty(Target) ? Target.level + 1 : 1,
          })
        );
      });
      newLayer.on("mouseover", function (e: any) {
        newLayer.setStyle({
          stroke: true,
          color: layer.feature.properties.lock ? "#1B3459" : "#24FF54",
        });
        if (!isEmpty(svgIconLayer)) ref?.current?.addLayer(svgIconLayer);
      });
      newLayer.on("mouseout", function (e: any) {
        newLayer.setStyle({
          stroke: false,
        });
        if (!isEmpty(svgIconLayer)) ref?.current?.removeLayer(svgIconLayer);
      });
    });
  }

  function fetchLayerParent() {
    if (!isEmpty(layerParent)) {
      const oldLatLng = layerParent.feature.properties.radius
        ? layerParent._latlng
        : layerParent.getLatLngs()[0];
      const newLatLng = layerParent.feature.properties.radius
        ? {
            lat: (oldLatLng.lat * 0.5 * window.innerWidth) / 700,
            lng: (oldLatLng.lng * 0.5 * window.innerWidth) / 700,
          }
        : oldLatLng.map((ll: any) => ({
            lat: (ll.lat * 0.5 * window.innerWidth) / 700,
            lng: (ll.lng * 0.5 * window.innerWidth) / 700,
          }));
      const newLayer = layerParent.feature.properties.radius
        ? new L.Circle(
            newLatLng,
            (layerParent.feature.properties.radius * 0.5 * window.innerWidth) /
              700
          )
        : new L.Polygon(newLatLng as LatLngExpression[]);

      ref?.current?.addLayer(newLayer);
      map.fitBounds(newLayer.getBounds() as L.LatLngBoundsExpression);
      newLayer.setStyle({
        stroke: true,
        fillOpacity: 0,
        color: "red",
      });
    }
  }

  useEffect(() => {
    if (!isEmpty(data.features)) {
      fetchLayer();
    } else {
      ref?.current?.clearLayers();
      fetchLayerParent();
    }
  }, [data, map, layerParent]);

  return <FeatureGroup ref={ref} />;
};

export default DisplayLayers;
