import L, {
  Circle,
  LatLngBoundsExpression,
  PointExpression,
  Polygon,
  Rectangle,
} from "leaflet";

export function createLockIcon() {
  let svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgElement.setAttribute("viewBox", "0 0 13 15");
  svgElement.setAttribute("width", "13");
  svgElement.setAttribute("height", "15");
  svgElement.setAttribute("fill", "none");
  svgElement.innerHTML =
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M10 3.5V6H11.5C12.3284 6 13 6.67157 13 7.5V13.5C13 14.3284 12.3284 15 11.5 15H1.5C0.671573 15 0 14.3284 0 13.5V7.5C0 6.67157 0.671573 6 1.5 6H3V3.5C3 1.567 4.567 0 6.5 0C8.433 0 10 1.567 10 3.5ZM4 3.5C4 2.11929 5.11929 1 6.5 1C7.88071 1 9 2.11929 9 3.5V6H4V3.5Z" fill="#1B3459" />';
  return svgElement;
}

export function getBoundsLockIcon(layer: Polygon | Rectangle | Circle) {
  const circleBounds = layer.getBounds();
  const northEastBounds = circleBounds.getNorthEast();
  const southWestBounds = circleBounds.getSouthWest();

  const topMidPoint = L.bounds(
    Object.values(northEastBounds).map((vl) => vl - 200) as PointExpression,
    // Object.values(northEastBounds) as PointExpression,
    Object.values(circleBounds.getCenter()) as PointExpression
  ).getCenter();
  const bottomMidPoint = L.bounds(
    Object.values(circleBounds.getCenter()) as PointExpression,
    Object.values(southWestBounds).map((vl) => vl + 200) as PointExpression
    // Object.values(southWestBounds) as PointExpression
  ).getCenter();

  return [
    Object.values(topMidPoint),
    Object.values(bottomMidPoint),
  ] as LatLngBoundsExpression;
}
