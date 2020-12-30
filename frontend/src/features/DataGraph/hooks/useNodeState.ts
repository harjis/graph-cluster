import React from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import { fromNodeIdState, toCoordinatesState } from './useDataEdgeInProgress';
import { getRelativeCoordinates } from '../../../utils/svg_utils';
import { Node, updateNode } from '../../../api/nodes';
import { nodeHasToEdgesQuery, nodeState } from '../atoms/nodes';
import { edgeIdsState, edgeState } from '../atoms/edges';
import { currentGraphIdQuery } from '../atoms/graph';
import { createEdge } from '../../../api/edges';
import { useAsyncEffect } from '../../../hooks/useAsyncEffect';

const debouncedUpdateNode = AwesomeDebouncePromise(updateNode, 200);

type Coordinates = { x: number; y: number };
type Props = {
  nodeId: number;
  canvasRef: React.RefObject<SVGSVGElement>;
};
type Return = {
  hasToEdges: boolean;
  isEdgeInProgress: boolean;
  node: Node;
  startEdgeInProgress: (event: React.MouseEvent) => void;
  onDrag: (coordinates: Coordinates) => void;
  onStopDrag: () => void;
  stopEdgeInProgress: (toNodeId: number) => void;
};
export const useNodeState = (props: Props): Return => {
  const { canvasRef } = props;

  const currentGraphId = useRecoilValue(currentGraphIdQuery);
  const [node, setNode] = useRecoilState(nodeState(props.nodeId));
  const hasToEdges = useRecoilValue(nodeHasToEdgesQuery(props.nodeId));
  const setToCoordinates = useSetRecoilState(toCoordinatesState);
  const [fromNodeId, setFromNodeId] = useRecoilState(fromNodeIdState);

  // TODO is this a good place for this
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

  const onDrag = React.useCallback(
    ({ x, y }: Coordinates) => {
      setNode((node) => ({ ...node, x, y }));
    },
    [setNode]
  );

  const onStopDrag = useAsyncEffect(async () => {
    await debouncedUpdateNode(node);
  });

  return {
    hasToEdges,
    isEdgeInProgress: !!fromNodeId,
    node,
    startEdgeInProgress,
    onDrag,
    onStopDrag,
    stopEdgeInProgress,
  };
};
