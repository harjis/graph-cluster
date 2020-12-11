import React from 'react';

import { Coordinates, getRelativeCoordinates } from '../../../utils/svg_utils';
import { CONNECTOR_TYPE } from '../constants/constants';

export type { Coordinates };

type State = {
  fromNodeId: number | null;
  toCoordinates: Coordinates | null;
};
const initialState = {
  fromNodeId: null,
  toCoordinates: null,
};

type ReturnType = {
  ref: React.RefObject<SVGSVGElement>;
  edgeInProgressState: State;
  onStartEdgeInProgress: (fromNodeId: number, event: React.MouseEvent) => void;
  onStopEdgeInProgress: () => void;
};
export function useDataEdgeInProgress(): ReturnType {
  const [edgeInProgressState, setState] = React.useState<State>(initialState);
  const ref = React.useRef<SVGSVGElement>(null);

  const onStopEdgeInProgress = (): void => {
    setState(() => initialState);
  };

  const onStartEdgeInProgress = (
    fromNodeId: number,
    event: React.MouseEvent
  ): void => {
    setState((state) => {
      const toCoordinates = getRelativeCoordinates(ref.current, event);
      if (!toCoordinates) return state;
      return {
        ...state,
        fromNodeId,
        toCoordinates,
      };
    });
  };

  React.useEffect(() => {
    const isEdgeInProgressStarted = (): boolean =>
      edgeInProgressState.fromNodeId !== null;
    const mouseUpHandler = (event: MouseEvent): void => {
      if (
        isEdgeInProgressStarted() &&
        event.target instanceof Element &&
        !event.target.getAttribute(CONNECTOR_TYPE)
      ) {
        onStopEdgeInProgress();
      }
    };
    const onMove = (event: MouseEvent): void => {
      if (!isEdgeInProgressStarted()) return;
      setState((state) => {
        const toCoordinates = getRelativeCoordinates(ref.current, event);
        if (!toCoordinates) return state;
        return {
          ...state,
          toCoordinates,
        };
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', mouseUpHandler);

    return (): void => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [edgeInProgressState.fromNodeId]);

  return {
    ref,
    edgeInProgressState,
    onStartEdgeInProgress,
    onStopEdgeInProgress,
  };
}
