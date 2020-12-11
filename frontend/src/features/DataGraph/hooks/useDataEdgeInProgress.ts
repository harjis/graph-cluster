import React from 'react';

type CTM = {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
};
type OnDragHandler = (event: MouseEvent) => void;
type State = {
  ctm: CTM | null | undefined;
  fromNodeId: number | null | undefined;
  clientX: number;
  clientY: number;
};
const initialState = {
  fromNodeId: null,
  ctm: null,
  clientX: 0,
  clientY: 0,
};

export function useDataEdgeInProgress() {
  const [edgeInProgressState, setState] = React.useState<State>(initialState);

  const someFun = (event: MouseEvent) => {
    if (
      event.target instanceof Element &&
      !event.target.getAttribute('data-connector-type')
    ) {
      onStopEdgeInProgress();
      return;
    }
  };
  const onMove = React.useRef<OnDragHandler>((event: MouseEvent) => {
    setState((state) => {
      const { clientX, clientY } = event;
      const div = getCanvasContainer();
      return { ...state, clientX, clientY: clientY + div.scrollTop };
    });
  });

  const onStartEdgeInProgress = (
    fromNodeId: number,
    event: React.MouseEvent,
    svg: React.RefObject<SVGSVGElement>
  ) => {
    if (!svg.current) return;
    const ctm = svg.current.getScreenCTM();
    const { clientX, clientY } = event;
    const div = getCanvasContainer();
    setState((state) => ({
      ...state,
      ctm,
      fromNodeId,
      clientX,
      clientY: clientY + div.scrollTop,
    }));
    window.addEventListener('mousemove', onMove.current);
    window.addEventListener('mouseup', someFun);
  };

  const onStopEdgeInProgress = () => {
    window.removeEventListener('mousemove', onMove.current);
    window.removeEventListener('mouseup', someFun);
    setState(() => initialState);
  };
  return { edgeInProgressState, onStartEdgeInProgress, onStopEdgeInProgress };
}

function getCanvasContainer(): HTMLDivElement {
  const div = document.querySelector<HTMLDivElement>('[data-canvas-container]');
  if (!div)
    throw new Error(
      'You need to provide data-canvas-container around svg which also has overflow-y: auto,' +
        ' so that Edge in progress works correctly with scrolling'
    );
  return div;
}
