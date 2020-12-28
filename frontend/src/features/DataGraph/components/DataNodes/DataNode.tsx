import React from 'react';

import InputNode from './InputNode/InputNode';
import NodeRefNode from './NodeRefNode/NodeRefNode';
import OutputNode from './OutputNode/OutputNode';
import { useNodeState } from '../../hooks/useNodeState';

type Props = {
  graphId: number;
  nodeId: number;
  onStartEdgeInProgress: (nodeId: number, event: React.MouseEvent) => void;
  onStopEdgeInProgress: () => void;
};
export const DataNode: React.FC<Props> = React.memo((props) => {
  const { onStartEdgeInProgress } = props;
  const { node, startDrag, stopDrag } = useNodeState(props);
  const onClickFromConnector = React.useCallback(
    (event: React.MouseEvent) => onStartEdgeInProgress(node.id, event),
    [node.id, onStartEdgeInProgress]
  );
  const onClickToConnector = React.useCallback(() => {}, []);
  switch (node.type) {
    case 'InputNode': {
      return (
        <InputNode
          onStartDrag={startDrag}
          onStopDrag={stopDrag}
          node={node}
          onClickFromConnector={onClickFromConnector}
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
