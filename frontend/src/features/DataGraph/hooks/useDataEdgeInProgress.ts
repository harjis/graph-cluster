import React from 'react';
import { useRecoilValue } from 'recoil';

import { Coordinates, getRelativeCoordinates } from '../../../utils/svg_utils';
import { CONNECTOR_TYPE } from '../constants/constants';
import { nodesQuery } from '../atoms/nodes';
import { getNodeBottomMiddlePosition } from '../utils/nodeUtils';

export type { Coordinates };

type State = {
  fromCoordinates: Coordinates | null;
  toCoordinates: Coordinates | null;
};
const initialState = {
  fromCoordinates: null,
  toCoordinates: null,
};

type Props = {
  graphId: number;
};
type ReturnType = {
  ref: React.RefObject<SVGSVGElement>;
  edgeInProgressState: State;
  onStartEdgeInProgress: (fromNodeId: number, event: React.MouseEvent) => void;
  onStopEdgeInProgress: () => void;
};

export function useDataEdgeInProgress(props: Props): ReturnType {
  const [edgeInProgressState, setState] = React.useState<State>(initialState);
  const ref = React.useRef<SVGSVGElement>(null);
  const nodes = useRecoilValue(nodesQuery(props.graphId));

  const onStopEdgeInProgress = React.useCallback((): void => {
    setState(() => initialState);
  }, []);

  const onStartEdgeInProgress = React.useCallback(
    (fromNodeId: number, event: React.MouseEvent): void => {
      setState(
        (state): State => {
          const toCoordinates = getRelativeCoordinates(ref.current, event);
          if (!toCoordinates) return state;
          const fromNode = nodes.find((node) => node.id === fromNodeId);
          if (!fromNode) return state;
          const fromCoordinates = getNodeBottomMiddlePosition(fromNode);
          return {
            ...state,
            fromCoordinates,
            toCoordinates,
          };
        }
      );
    },
    [nodes]
  );

  React.useEffect(() => {
    const isEdgeInProgressStarted = (): boolean =>
      edgeInProgressState.fromCoordinates !== null;
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
  }, [edgeInProgressState.fromCoordinates, onStopEdgeInProgress]);

  return {
    ref,
    edgeInProgressState,
    onStartEdgeInProgress,
    onStopEdgeInProgress,
  };
}
