import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { fromNodeIdState, toCoordinatesState } from './useDataEdgeInProgress';
import { getRelativeCoordinates } from '../../../utils/svg_utils';
import { Node } from '../../../api/nodes';
import { nodeHasToEdgesQuery, nodeQuery, nodesState } from '../atoms/nodes';
import { useWindowEventListener } from '../../../hooks/useWindowEventListener';

type Coordinates = { x: number; y: number };
type Props = {
  nodeId: number;
  canvasRef: React.RefObject<SVGSVGElement>;
};
type Return = {
  hasToEdges: boolean;
  node: Node;
  startDrag: (event: React.MouseEvent) => void;
  stopDrag: () => void;
  startEdgeInProgress: (event: React.MouseEvent) => void;
  stopEdgeInProgress: () => void;
};
export const useNodeState = (props: Props): Return => {
  const { canvasRef } = props;

  const [nodeOffset, setNodeOffset] = useState<Coordinates | null>(null);
  const setNodes = useSetRecoilState(nodesState);
  const node = useRecoilValue(nodeQuery(props.nodeId));
  const hasToEdges = useRecoilValue(nodeHasToEdgesQuery(props.nodeId));
  const setToCoordinates = useSetRecoilState(toCoordinatesState);
  const setFromNodeId = useSetRecoilState(fromNodeIdState);

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

  const stopEdgeInProgress = React.useCallback(() => {
    setToCoordinates({ x: 0, y: 0 });
    setFromNodeId(null);
  }, [setFromNodeId, setToCoordinates]);

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
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id !== props.nodeId) return node;
        return { ...node, x: node.x - xDiff, y: node.y - yDiff };
      })
    );
  };

  useWindowEventListener('mousemove', drag);

  return {
    hasToEdges,
    node,
    startDrag,
    stopDrag,
    startEdgeInProgress,
    stopEdgeInProgress,
  };
};
