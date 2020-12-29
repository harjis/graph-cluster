import React from 'react';

import {
  BottomLeftText,
  CenteredText,
  Node,
} from '../../../../../components/Graph';
import FromConnector from '../../EdgeConnectors/FromConnector';
import {
  dataGraphNodeHeight,
  dataGraphNodeWidth,
} from '../../../constants/constants';
import { CommonNodeProps } from '../types';

import styles from '../OutputNode/OutputNode.module.css';

const NodeRefNode = (props: CommonNodeProps) => {
  const onClickFromConnector = () => {};
  const { node } = props;
  return (
    <Node
      height={dataGraphNodeHeight}
      onMouseDown={props.onStartDrag}
      onMouseUp={props.onStopDrag}
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
      <BottomLeftText
        styles={styles.nodeRefNodeBottomText}
        nodeHeight={dataGraphNodeHeight}
        nodeWidth={dataGraphNodeWidth}
      >
        Node reference
      </BottomLeftText>
      <FromConnector onClick={onClickFromConnector} />
    </Node>
  );
};

export default NodeRefNode;
