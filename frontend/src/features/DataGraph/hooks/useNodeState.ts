import React, { useState } from 'react';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import { fromNodeIdState, toCoordinatesState } from './useDataEdgeInProgress';
import { getRelativeCoordinates } from '../../../utils/svg_utils';
import { Node } from '../../../api/nodes';
import { nodeHasToEdgesQuery, nodeState } from '../atoms/nodes';
import { useWindowEventListener } from '../../../hooks/useWindowEventListener';
import { edgeIdsState, edgeState } from '../atoms/edges';
import { currentGraphIdQuery } from '../atoms/graph';
import { createEdge } from '../../../api/edges';

type Coordinates = { x: number; y: number };
type Props = {
  nodeId: number;
  canvasRef: React.RefObject<SVGSVGElement>;
};
type Return = {
  hasToEdges: boolean;
  isEdgeInProgress: boolean;
  node: Node;
  startDrag: (event: React.MouseEvent) => void;
  startEdgeInProgress: (event: React.MouseEvent) => void;
  stopDrag: () => void;
  stopEdgeInProgress: (toNodeId: number) => void;
};
export const useNodeState = (props: Props): Return => {
  const { canvasRef } = props;

  const currentGraphId = useRecoilValue(currentGraphIdQuery);
  const [nodeOffset, setNodeOffset] = useState<Coordinates | null>(null);
  const [node, setNode] = useRecoilState(nodeState(props.nodeId));
  const hasToEdges = useRecoilValue(nodeHasToEdgesQuery(props.nodeId));
  const setToCoordinates = useSetRecoilState(toCoordinatesState);
  const [fromNodeId, setFromNodeId] = useRecoilState(fromNodeIdState);

  const addEdge = useRecoilCallback(
    ({ set, snapshot }) => async (toNodeId: number) => {
      if (fromNodeId === null) {
        return;
      }
      const newEdge = await createEdge(currentGraphId, fromNodeId, toNodeId);
      const prevEdgeIds = await snapshot.getPromise(edgeIdsState);
      set(edgeIdsState, prevEdgeIds.concat(newEdge.id));
      set(edgeState(newEdge.id), newEdge);
    },
    [fromNodeId]
  );

  const startEdgeInProgress = React.useCallback(
    (event: React.MouseEvent) => {
      setToCoordinates((state) => {
        const toCoordinates = getRelativeCoordinates(canvasRef.current, event);
        if (!toCoordinates) return state;
        return toCoordinates;
      });
      setFromNodeId(props.nodeId);
    },
    [canvasRef, props.nodeId, setFromNodeId, setToCoordinates]
  );

  const stopEdgeInProgress = React.useCallback(
    (toNodeId: number) => {
      addEdge(toNodeId).then(() => {
        setToCoordinates({ x: 0, y: 0 });
        setFromNodeId(null);
      });
    },
    [addEdge, setFromNodeId, setToCoordinates]
  );

  const startDrag = React.useCallback((event: React.MouseEvent) => {
    const { pageX, pageY } = event;
    setNodeOffset({ x: pageX, y: pageY });
  }, []);

  const stopDrag = React.useCallback(() => {
    setNodeOffset(null);
  }, []);

  const drag = (event: MouseEvent) => {
    if (nodeOffset === null) {
      return;
    }
    const xDiff = nodeOffset.x - event.pageX;
    const yDiff = nodeOffset.y - event.pageY;
    setNodeOffset({ x: event.pageX, y: event.pageY });
    setNode((node) => ({ ...node, x: node.x - xDiff, y: node.y - yDiff }));
  };

  useWindowEventListener('mousemove', drag);

  return {
    hasToEdges,
    isEdgeInProgress: !!fromNodeId,
    node,
    startDrag,
    startEdgeInProgress,
    stopDrag,
    stopEdgeInProgress,
  };
};
