import React from 'react';

import InputNode from './InputNode/InputNode';
import NodeRefNode from './NodeRefNode/NodeRefNode';
import OutputNode from './OutputNode/OutputNode';
import { useNodeState } from '../../hooks/useNodeState';

type Props = {
  canvasRef: React.RefObject<SVGSVGElement>;
  nodeId: number;
};
export const DataNode: React.FC<Props> = React.memo((props) => {
  const { node, startDrag, stopDrag, startEdgeInProgress } = useNodeState(
    props
  );

  const onClickToConnector = React.useCallback(() => {}, []);
  switch (node.type) {
    case 'InputNode': {
      return (
        <InputNode
          onStartDrag={startDrag}
          onStopDrag={stopDrag}
          node={node}
          onClickFromConnector={startEdgeInProgress}
        />
      );
    }

    case 'OutputNode':
      return (
        <OutputNode
          canConnect={false}
          hasToEdges={false}
          node={node}
          onClickToConnector={onClickToConnector}
          onStartDrag={startDrag}
          onStopDrag={stopDrag}
        />
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
});
