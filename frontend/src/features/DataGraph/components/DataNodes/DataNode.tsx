import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { getComponentByType } from '../../utils/nodeComponentUtil';
import { nodesState } from '../../atoms/nodes';
import { Node } from '../../../../api/nodes';
import { useWindowEventListener } from '../../../../hooks/useWindowEventListener';

type Coordinates = { x: number; y: number };
type Props = {
  node: Node;
};
export const DataNode: React.FC<Props> = (props) => {
  const [nodeOffset, setNodeOffset] = useState<Coordinates | null>(null);
  const [nodes, setNodes] = useRecoilState(nodesState(props.node.graph_id));
  const NodeComponent = getComponentByType(props.node.type);

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
    setNodes((nodes) =>
      nodes.map((node) => {
        if (props.node.id === node.id) {
          return {
            ...node,
            x: node.x - xDiff,
            y: node.y - yDiff,
          };
        } else {
          return node;
        }
      })
    );
  };

  useWindowEventListener('mousemove', drag);

  return (
    <NodeComponent
      node={props.node}
      onStartDrag={startDrag}
      onStopDrag={stopDrag}
    />
  );
};
