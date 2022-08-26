import { useEffect, useRef } from "react";
import { FeatureGroup, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import isEmpty from "lodash.isempty";
import { createLockIcon, getBoundsLockIcon } from "utils/leafletHelper";
import { RootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setOldTarget,
  setTargetShape,
} from "../../../../store/projectMapSlice";

type Props = {
  data: any;
  layerParent: any;
};

const DisplayLayers = ({ data, layerParent }: Props) => {
  const map = useMap();
  const ref = useRef<any>();
  const dispatch = useDispatch();
  const Target = useSelector((state: RootState) => state.projectMap.Target);
  const Resize = useSelector((state: RootState) => state.projectMap.Resize);
  function renderColorProduct(status: string): string | null {
    switch (status) {
      case "2":
        return "#06C270";
      case "3":
        return "#FFCC00";
      default:
        return null;
    }
  }
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
            // lat: (oldLatLng.lat * 0.65 * window.innerWidth) / 700,
            lng: (oldLatLng.lng * 0.65 * window.innerWidth) / 700,
            lat: (oldLatLng.lat * (window.innerHeight - 150)) / 700,
          }
        : oldLatLng.map((ll: any) => ({
            lng: (ll.lng * 0.65 * window.innerWidth) / 700,
            lat: (ll.lat * (window.innerHeight - 150)) / 700,
            // lat: (ll.lat * 0.65 * window.innerWidth) / 700,
            // lng: (ll.lng * (window.innerHeight - 150)) / 700,
          }));
      const newLayer = layer.feature.properties.radius
        ? new L.Circle(
            newLatLng,
            (layer.feature.properties.radius * 0.65 * window.innerWidth) / 700
          )
        : new L.Polygon(newLatLng as LatLngExpression[]);

      ref?.current?.addLayer(newLayer);
      if (
        layer.feature.properties.level === "PRODUCT" &&
        !isEmpty(renderColorProduct(layer.feature.properties.status))
      ) {
        newLayer.setStyle({
          stroke: false,
          fillOpacity: 0.5,
          fillColor: renderColorProduct(layer.feature.properties.status),
          color: renderColorProduct(layer.feature.properties.status),
        });
      } else {
        if (layer.feature.properties.level === "PRODUCT") {
          newLayer.setStyle({
            color: "#1B3459",
            stroke: true,
            fillOpacity: 0,
          });
        } else {
          newLayer.setStyle({
            stroke: false,
            fillOpacity: 0,
            fillColor: renderColorProduct(layer.feature.properties.status),
          });
        }
      }

      let svgIconLayer = null;
      if (
        layer.feature.properties.status === "4" ||
        layer.feature.properties.status === "99"
      ) {
        svgIconLayer = new L.SVGOverlay(
          createLockIcon(),
          getBoundsLockIcon(newLayer)
        );
        ref?.current?.addLayer(svgIconLayer);
      }

      newLayer.on("click", function (e: any) {
        dispatch(
          setTargetShape({
            id: layer.feature.properties.id,
            level: !isEmpty(Target)
              ? !isEmpty(Target.productionId)
                ? "PRODUCT"
                : layer.feature.properties.level === "PRODUCT"
                ? "PRODUCT"
                : Target.level + 1
              : 1,
          })
        );
        if (!isEmpty(Target) && isEmpty(Target.productionId)) {
          dispatch(setOldTarget(Target));
        }
      });
      newLayer.on("mouseover", function (e: any) {
        newLayer.setStyle({
          stroke: true,
          color: "#24FF54",
        });
        newLayer.bindPopup(layer.feature.properties.name).openPopup();
      });
      newLayer.on("mouseout", function (e: any) {
        newLayer.setStyle({
          stroke: layer.feature.properties.level === "PRODUCT" ? true : false,
          color:
            layer.feature.properties.level === "PRODUCT" &&
            (layer.feature.properties.status === "4" ||
              layer.feature.properties.status === "99")
              ? "#1B3459"
              : undefined,
        });
        newLayer.closePopup();
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
            lng: (oldLatLng.lng * 0.65 * window.innerWidth) / 700,
            lat: (oldLatLng.lat * (window.innerHeight - 150)) / 700,
          }
        : oldLatLng.map((ll: any) => ({
            lng: (ll.lng * 0.65 * window.innerWidth) / 700,
            lat: (ll.lat * (window.innerHeight - 150)) / 700,
            // lat: (ll.lat * 0.65 * window.innerWidth) / 700,
            // lng: (ll.lng * (window.innerHeight - 150)) / 700,
          }));
      const newLayer = layerParent.feature.properties.radius
        ? new L.Circle(
            newLatLng,
            (layerParent.feature.properties.radius * 0.65 * window.innerWidth) /
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
  }, [data, map, layerParent, Resize]);

  return <FeatureGroup ref={ref} />;
};

export default DisplayLayers;
