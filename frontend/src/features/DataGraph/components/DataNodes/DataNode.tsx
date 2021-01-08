import React from 'react';

import InputNode from './InputNode/InputNode';
import NodeRefNode from './NodeRefNode/NodeRefNode';
import OutputNode from './OutputNode/OutputNode';
import { Node } from '../../../../api/nodes';
import { useNodeState } from '../../hooks/useNodeState';

type Props = {
  canvasRef: React.RefObject<SVGSVGElement>;
  node: Node;
};
export const DataNode: React.FC<Props> = React.memo((props) => {
  const {
    hasToEdges,
    isEdgeInProgress,
    node,
    onDrag,
    onStopDrag,
    startEdgeInProgress,
    stopEdgeInProgress,
  } = useNodeState(props);
  switch (node.type) {
    case 'InputNode': {
      return (
        <InputNode
          onDrag={onDrag}
          onStopDrag={onStopDrag}
          node={node}
          onClickFromConnector={startEdgeInProgress}
        />
      );
    }

    case 'OutputNode':
      return (
        <OutputNode
          canConnect={isEdgeInProgress}
          hasToEdges={hasToEdges}
          node={node}
          onClickToConnector={stopEdgeInProgress}
          onDrag={onDrag}
          onStopDrag={onStopDrag}
        />
      );
    case 'NodeRefNode':
      return (
        <NodeRefNode onDrag={onDrag} onStopDrag={onStopDrag} node={node} />
      );
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
});
