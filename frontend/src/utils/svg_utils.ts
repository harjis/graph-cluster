import React from 'react';

export type Coordinates = {
  x: number;
  y: number;
};
export function getRelativeCoordinates(
  svg: SVGSVGElement | null,
  event: MouseEvent | React.MouseEvent
): Coordinates | null {
  if (!svg) return null;
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  const { clientX, clientY } = event;
  return getMousePosition(clientX, clientY, ctm);
}

type CTM = {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
};
// Returns mouse position relative to SVG element
function getMousePosition(clientX: number, clientY: number, ctm: CTM): Coordinates {
  return {
    x: (clientX - ctm.e) / ctm.a,
    y: (clientY - ctm.f) / ctm.d,
  };
}
