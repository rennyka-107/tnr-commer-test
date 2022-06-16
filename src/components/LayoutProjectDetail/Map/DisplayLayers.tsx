import { useEffect, useRef } from "react";
import { FeatureGroup, useMap } from "react-leaflet";
import L, { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import isEmpty from "lodash.isempty";
import { createLockIcon, getBoundsLockIcon } from "utils/leafletHelper";

type Props = {
  data: any;
  layerParent: any;
};

const DisplayLayers = ({ data, layerParent }: Props) => {
  const map = useMap();
  const ref = useRef<any>();

  // function setEventLayer(layer: Polygon | Rectangle | Circle, target: any) {
  //   const svgIconLayer = new L.SVGOverlay(
  //     createLockIcon(),
  //     getBoundsLockIcon(layer)
  //   );
  //   layer.setStyle({
  //     stroke: false,
  //     fillOpacity: 0,
  //   });
  //   layer.on('mouseover', function (e: any) {
  //     layer.setStyle({
  //       stroke: true,
  //     });
  //     target.addLayer(svgIconLayer);
  //   });
  //   layer.on('mouseout', function (e: any) {
  //     layer.setStyle({
  //       stroke: false,
  //     });
  //     target.removeLayer(svgIconLayer);
  //   });
  // }

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
            lat: (oldLatLng.lat * 0.65 * window.innerWidth) / 700,
            lng: (oldLatLng.lng * 0.65 * window.innerWidth) / 700,
          }
        : oldLatLng.map((ll: any) => ({
            lat: (ll.lat * 0.65 * window.innerWidth) / 700,
            lng: (ll.lng * 0.65 * window.innerWidth) / 700,
          }));
      const newLayer = layer.feature.properties.radius
        ? new L.Circle(
            newLatLng,
            (layer.feature.properties.radius * 0.65 * window.innerWidth) / 700
          )
        : new L.Polygon(newLatLng as LatLngExpression[]);
      ref?.current?.addLayer(newLayer);
      newLayer.on("click", function (e: any) {
        map.fitBounds(newLayer.getBounds() as LatLngBoundsExpression);
      });
      newLayer.setStyle({
        color: layer.feature.properties.lock ? "#1B3459" : "#24FF54",
        fillOpacity: 0,
      });
      if (layer.feature.properties.lock) {
        const svgIconLayer = new L.SVGOverlay(
          createLockIcon(),
          getBoundsLockIcon(newLayer)
        );
        ref?.current?.addLayer(svgIconLayer);
      }
    });
  }

  function fetchLayerParent() {
    if (!isEmpty(layerParent)) {
      const oldLatLng = layerParent.feature.properties.radius
        ? layerParent._latlng
        : layerParent.getLatLngs()[0];
      const newLatLng = layerParent.feature.properties.radius
        ? {
            lat: (oldLatLng.lat * 0.65 * window.innerWidth) / 700,
            lng: (oldLatLng.lng * 0.65 * window.innerWidth) / 700,
          }
        : oldLatLng.map((ll: any) => ({
            lat: (ll.lat * 0.65 * window.innerWidth) / 700,
            lng: (ll.lng * 0.65 * window.innerWidth) / 700,
          }));
      const newLayer = layerParent.feature.properties.radius
        ? new L.Circle(
            newLatLng,
            (layerParent.feature.properties.radius * 0.65 * window.innerWidth) /
              700
          )
        : new L.Polygon(newLatLng as LatLngExpression[]);

      ref?.current?.addLayer(newLayer);
      map.fitBounds(newLayer.getBounds() as LatLngBoundsExpression);
      newLayer.setStyle({
        color: "red",
        fillOpacity: 0,
      });
    }
  }

  // useEffect(() => {
  //   if (!isEmpty(layerParent)) {
  //     const oldLatLng = layerParent.feature.properties.radius
  //       ? layerParent._latlng
  //       : layerParent.getLatLngs()[0];
  //     const newLatLng = layerParent.feature.properties.radius
  //       ? {
  //           lat: (oldLatLng.lat * 0.65 * window.innerWidth) / 700,
  //           lng: (oldLatLng.lng * 0.65 * window.innerWidth) / 700,
  //         }
  //       : oldLatLng.map((ll: any) => ({
  //           lat: (ll.lat * 0.65 * window.innerWidth) / 700,
  //           lng: (ll.lng * 0.65 * window.innerWidth) / 700,
  //         }));
  //     const newLayer = layerParent.feature.properties.radius
  //       ? new L.Circle(
  //           newLatLng,
  //           (layerParent.feature.properties.radius * 0.65 * window.innerWidth) /
  //             700
  //         )
  //       : new L.Polygon(newLatLng as LatLngExpression[]);

  //     map.addLayer(newLayer);
  //     map.fitBounds(newLayer.getBounds() as LatLngBoundsExpression);
  //     newLayer.setStyle({
  //       color: "red",
  //       fillOpacity: 0,
  //     });
  //   }
  // }, [layerParent]);

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
