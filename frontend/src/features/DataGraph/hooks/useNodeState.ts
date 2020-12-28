import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { nodeState } from '../atoms/nodes';
import { useWindowEventListener } from '../../../hooks/useWindowEventListener';
import { Node } from '../../../api/nodes';

type Coordinates = { x: number; y: number };
type Props = {
  nodeId: number;
};
type Return = {
  node: Node;
  startDrag: (event: React.MouseEvent) => void;
  stopDrag: () => void;
};
export const useNodeState = (props: Props): Return => {
  const [nodeOffset, setNodeOffset] = useState<Coordinates | null>(null);
  const [node, setNode] = useRecoilState(nodeState({ nodeId: props.nodeId }));

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

  return { node, startDrag, stopDrag };
};
