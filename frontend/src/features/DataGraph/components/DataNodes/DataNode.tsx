import React from 'react';

import InputNode from './InputNode/InputNode';
import NodeRefNode from './NodeRefNode/NodeRefNode';
import OutputNode from './OutputNode/OutputNode';
import { useNodeState } from '../../hooks/useNodeState';

type Props = {
  graphId: number;
  nodeId: number;
  onStartEdgeInProgress: (nodeId: number, event: React.MouseEvent) => void;
};
export const DataNode: React.FC<Props> = (props) => {
  const { node, startDrag, stopDrag } = useNodeState(props);

  switch (node.type) {
    case 'InputNode':
      return (
        <InputNode
          onStartDrag={startDrag}
          onStopDrag={stopDrag}
          node={node}
          onClickFromConnector={(event: React.MouseEvent) =>
            props.onStartEdgeInProgress(node.id, event)
          }
        />
      );
    case 'OutputNode':
      return (
        <OutputNode onStartDrag={startDrag} onStopDrag={stopDrag} node={node} />
      );
    case 'NodeRefNode':
      return (
        <NodeRefNode
          onStartDrag={startDrag}
          onStopDrag={stopDrag}
          node={node}
        />
      );
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};
