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

export function createCanBuyIcon() {
  let svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgElement.setAttribute("viewBox", "0 0 21 21");
  svgElement.setAttribute("width", "21");
  svgElement.setAttribute("height", "21");
  svgElement.setAttribute("fill", "none");
  svgElement.innerHTML =
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M6.24652 7.16673L9.64072 1.50972L8.4974 0.82373L4.6916 7.16673H1.33994C0.822118 7.16673 0.402344 7.5865 0.402344 8.10432V8.68934C0.402344 12.6141 1.31614 16.485 3.07136 19.9955C3.22598 20.3047 3.54205 20.5001 3.8878 20.5001H16.9169C17.2626 20.5001 17.5787 20.3047 17.7333 19.9955C19.4886 16.485 20.4023 12.6141 20.4023 8.68934V8.10432C20.4023 7.5865 19.9826 7.16673 19.4648 7.16673H16.1132L12.3074 0.82373L11.1641 1.50972L14.5583 7.16673H6.24652ZM9.73568 16.5001V13.8334H7.06901V12.5001H9.73568V9.8334H11.069V12.5001H13.7357V13.8334H11.069V16.5001H9.73568Z" fill="#06C270"/>';
  return svgElement;
}

export function createSmallLockIcon() {
  let svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgElement.setAttribute("viewBox", "0 0 16 14");
  svgElement.setAttribute("width", "16");
  svgElement.setAttribute("height", "14");
  svgElement.setAttribute("fill", "none");
  svgElement.innerHTML =
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8828 12.0957L14.8828 9.5957H15.3135C15.6279 9.5957 15.8828 9.34082 15.8828 9.0264V5.16501C15.8828 4.85059 15.6279 4.5957 15.3135 4.5957H14.8828V2.0957C14.8828 1.26728 14.2112 0.595703 13.3828 0.595703H2.38281C1.55439 0.595703 0.882812 1.26728 0.882812 2.0957V12.0957C0.882812 12.9241 1.55438 13.5957 2.38281 13.5957H13.3828C14.2112 13.5957 14.8828 12.9241 14.8828 12.0957ZM14.8828 5.5957V8.5957L10.3828 8.5957C9.55439 8.5957 8.88281 7.92413 8.88281 7.0957C8.88281 6.26728 9.55439 5.5957 10.3828 5.5957H14.8828Z" fill="#FFCC00"/>';
  return svgElement;
}

export function getBoundsLockIcon(
  layer: Polygon | Rectangle | Circle,
  zoom: number
) {
  const scale = zoom + 2;
  const circleBounds = layer.getBounds();

  const topMidPoint = L.bounds(
    Object.values(circleBounds.getCenter()).map(
      (vl) => vl + 100 / Math.pow(2, scale)
    ) as PointExpression,
    Object.values(circleBounds.getCenter()) as PointExpression
  ).getCenter();
  
  const bottomMidPoint = L.bounds(
    Object.values(circleBounds.getCenter()) as PointExpression,
    Object.values(circleBounds.getCenter()).map(
      (vl) => vl - 100 / Math.pow(2, scale)
    ) as PointExpression
  ).getCenter();

  return [
    Object.values(topMidPoint),
    Object.values(bottomMidPoint),
  ] as LatLngBoundsExpression;
}
