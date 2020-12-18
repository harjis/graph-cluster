import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { getComponentByType } from '../../utils/nodeComponentUtil';
import { nodesState, nodeState } from '../../atoms/nodes';
import { useWindowEventListener } from '../../../../hooks/useWindowEventListener';

type Coordinates = { x: number; y: number };
type Props = {
  graphId: number;
  nodeId: number;
};
export const DataNode: React.FC<Props> = (props) => {
  const [nodeOffset, setNodeOffset] = useState<Coordinates | null>(null);
  const [node, setNode] = useRecoilState(
    nodeState({ graphId: props.graphId, nodeId: props.nodeId })
  );
  const NodeComponent = getComponentByType(node.type);

  const startDrag = (event: React.MouseEvent) => {
    const { pageX, pageY } = event;
    setNodeOffset({ x: pageX, y: pageY });
  };

  const stopDrag = () => {
    setNodeOffset(null);
  };

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

  return (
    <NodeComponent node={node} onStartDrag={startDrag} onStopDrag={stopDrag} />
  );
};
