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
import { nodeHasToEdgesQuery, nodeQuery, nodesState } from '../atoms/nodes';
import { currentGraphIdQuery } from '../atoms/graph';
import { createEdge } from '../../../api/edges';
import { useAsyncEffect } from '../../../hooks/useAsyncEffect';
import { edgesState } from '../atoms/edges';

const debouncedUpdateNode = AwesomeDebouncePromise(updateNode, 200);

type Coordinates = { x: number; y: number };
type Props = {
  node: Node;
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
  const setNodes = useSetRecoilState(nodesState);
  const node = useRecoilValue(nodeQuery(props.node.id));
  const hasToEdges = useRecoilValue(nodeHasToEdgesQuery(props.node.id));
  const setToCoordinates = useSetRecoilState(toCoordinatesState);
  const [fromNodeId, setFromNodeId] = useRecoilState(fromNodeIdState);

  // TODO is this a good place for this
  const addEdge = useRecoilCallback(
    ({ set, snapshot }) => async (toNodeId: number) => {
      if (fromNodeId === null) {
        return;
      }
      const newEdge = await createEdge(currentGraphId, fromNodeId, toNodeId);
      const prevEdges = await snapshot.getPromise(edgesState);
      set(edgesState, prevEdges.concat(newEdge));
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
      setFromNodeId(props.node.id);
    },
    [canvasRef, props.node.id, setFromNodeId, setToCoordinates]
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
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id !== props.node.id) {
            return node;
          } else {
            return { ...node, x, y };
          }
        })
      );
    },
    [props.node.id, setNodes]
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
