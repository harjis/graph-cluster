import React from 'react';

import InputNode from './InputNode/InputNode';
import NodeRefNode from './NodeRefNode/NodeRefNode';
import OutputNode from './OutputNode/OutputNode';
import { useNodeState } from '../../hooks/useNodeState';
import { getRelativeCoordinates } from '../../../../utils/svg_utils';
import { useSetRecoilState } from 'recoil';
import {
  fromNodeIdState,
  toCoordinatesState,
} from '../../hooks/useDataEdgeInProgress';

type Props = {
  canvasRef: React.RefObject<SVGSVGElement>;
  nodeId: number;
};
export const DataNode: React.FC<Props> = React.memo((props) => {
  const { canvasRef } = props;
  const setToCoordinates = useSetRecoilState(toCoordinatesState);
  const setFromNodeId = useSetRecoilState(fromNodeIdState);
  const onStartEdgeInProgress = React.useCallback(
    (fromNodeId: number, event: React.MouseEvent): void => {
      setToCoordinates((state) => {
        const toCoordinates = getRelativeCoordinates(canvasRef.current, event);
        if (!toCoordinates) return state;
        return toCoordinates;
      });
      setFromNodeId(fromNodeId);
    },
    [canvasRef, setFromNodeId, setToCoordinates]
  );
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
