import React from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

import { Coordinates, getRelativeCoordinates } from '../../../utils/svg_utils';
import { CONNECTOR_TYPE } from '../constants/constants';
import { getNodeBottomMiddlePosition } from '../utils/nodeUtils';
import { nodeState } from '../atoms/nodes';

export type { Coordinates };

export const fromNodeIdState = atom<number | null>({
  key: 'fromNodeIdState',
  default: null,
});

export const fromNodeCoordinatesQuery = selector({
  key: 'fromNodeCoordinatesQuery',
  get: ({ get }) => {
    const fromNodeId = get(fromNodeIdState);
    if (fromNodeId === null) return null;
    const node = get(nodeState(fromNodeId));
    return getNodeBottomMiddlePosition(node);
  },
});

export const toCoordinatesState = atom({
  key: 'toCoordinatesState',
  default: { x: 0, y: 0 },
});

type ReturnType = {
  fromCoordinates: Coordinates | null;
  toCoordinates: Coordinates;
};
export function useDataEdgeInProgress(
  canvasRef: React.RefObject<SVGSVGElement>
): ReturnType {
  const [fromNodeId, setFromNodeId] = useRecoilState(fromNodeIdState);
  const fromCoordinates = useRecoilValue(fromNodeCoordinatesQuery);
  const [toCoordinates, setToCoordinates] = useRecoilState(toCoordinatesState);

  const onStopEdgeInProgress = React.useCallback((): void => {
    setToCoordinates({ x: 0, y: 0 });
    setFromNodeId(null);
  }, [setFromNodeId, setToCoordinates]);

  React.useEffect(() => {
    const isEdgeInProgressStarted = (): boolean => fromNodeId !== null;
    const mouseUpHandler = (event: MouseEvent): void => {
      if (
        isEdgeInProgressStarted() &&
        event.currentTarget instanceof Element &&
        !event.currentTarget.getAttribute(CONNECTOR_TYPE)
      ) {
        onStopEdgeInProgress();
      }
    };
    const onMove = (event: MouseEvent): void => {
      if (!isEdgeInProgressStarted()) return;
      setToCoordinates((state) => {
        const toCoordinates = getRelativeCoordinates(canvasRef.current, event);
        if (!toCoordinates) return state;
        return toCoordinates;
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', mouseUpHandler);

    return (): void => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [canvasRef, fromNodeId, onStopEdgeInProgress, setToCoordinates]);

  return {
    fromCoordinates,
    toCoordinates,
  };
}
