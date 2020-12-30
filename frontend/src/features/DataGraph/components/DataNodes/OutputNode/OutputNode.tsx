import React from 'react';

import { CenteredText, Node } from '../../../../../components/Graph';
import ToConnector from '../../EdgeConnectors/ToConnector';
import {
  dataGraphNodeHeight,
  dataGraphNodeWidth,
} from '../../../constants/constants';
import { CommonNodeProps } from '../types';

import styles from './OutputNode.module.css';

type Props = CommonNodeProps & {
  canConnect: boolean;
  hasToEdges: boolean;
  onClickToConnector: (nodeId: number) => void;
};
const OutputNode = (props: Props) => {
  const { node, onClickToConnector } = props;
  const onClick = React.useCallback(() => {
    onClickToConnector(node.id);
  }, [node.id, onClickToConnector]);
  return (
    <Node
      height={dataGraphNodeHeight}
      onDrag={props.onDrag}
      onStopDrag={props.onStopDrag}
      styles={styles.outputNode}
      width={dataGraphNodeWidth}
      x={node.x}
      y={node.y}
    >
      <CenteredText
        nodeHeight={dataGraphNodeHeight}
        nodeWidth={dataGraphNodeWidth}
      >
        {node.name}
      </CenteredText>
      <ToConnector
        canConnect={props.canConnect}
        hasToEdges={props.hasToEdges}
        onClick={onClick}
      />
    </Node>
  );
};

export default OutputNode;
