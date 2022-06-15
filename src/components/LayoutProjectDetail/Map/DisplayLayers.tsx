import { useEffect, useRef } from "react";
import { FeatureGroup, useMap } from "react-leaflet";
import L, { LatLngBoundsExpression } from "leaflet";
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
    let dataLayer = new L.GeoJSON(data);
    dataLayer.eachLayer((layer: any) => {
      let circleLayer = layer.feature.properties.radius
        ? new L.Circle(layer._latlng, layer.feature.properties.radius)
        : null;

      (circleLayer ?? layer).on("click", function (e: any) {
        map.fitBounds(
          (circleLayer ?? layer).getBounds() as LatLngBoundsExpression
        );
      });

      // if (layer.feature.properties.radius) {
      //   console.log(layer._latlng, 'lng');
      //   const circleLatLng = layer._latlng;
      //   const newCircleLatLng = {
      //     lat: (circleLatLng.lat * 12) / 7,
      //     lng: (circleLatLng.lng * 12) / 7,
      //   };
      //   const newCircle = new L.Circle(
      //     newCircleLatLng,
      //     (layer.feature.properties.radius * 12) / 7
      //   );
      //   ref?.current?.addLayer(newCircle);
      // } else {
      //   const latLngs = layer.getLatLngs()[0];
      //   const newLatlng = latLngs.map((ll: any) => ({
      //     lat: (ll.lat * 12) / 7,
      //     lng: (ll.lng * 12) / 7,
      //   }));
      //   const newLayer = new L.Polygon(newLatlng as LatLngExpression[]);

      //   ref?.current?.addLayer(newLayer);
      // }

      ref?.current?.addLayer(circleLayer ?? layer);
      (circleLayer ?? layer).setStyle({
        color: layer.feature.properties.lock ? "#1B3459" : "#24FF54",
        fillOpacity: 0,
      });

      if (layer.feature.properties.lock) {
        const svgIconLayer = new L.SVGOverlay(
          createLockIcon(),
          getBoundsLockIcon(circleLayer ?? layer)
        );
        ref?.current?.addLayer(svgIconLayer);
      }
    });
  }

  useEffect(() => {
    if (!isEmpty(layerParent)) {
      console.log(layerParent, "display");
      let circleLayer = layerParent.feature.properties.radius
        ? new L.Circle(
            layerParent._latlng,
            layerParent.feature.properties.radius
          )
        : null;

      map.addLayer(circleLayer ?? layerParent);
      map.fitBounds(
        (circleLayer ?? layerParent).getBounds() as LatLngBoundsExpression
      );
      (circleLayer ?? layerParent).setStyle({
        color: "red",
        fillOpacity: 0,
      });

      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.zoomControl.remove();
    }
  }, [layerParent]);

  useEffect(() => {
    if (!isEmpty(data.features)) {
      fetchLayer();
    } else {
      ref?.current?.clearLayers();
    }
  }, [data, map]);

  return <FeatureGroup ref={ref} />;
};

export default DisplayLayers;
