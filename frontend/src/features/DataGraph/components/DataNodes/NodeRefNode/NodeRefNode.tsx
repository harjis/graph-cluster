import React from 'react';

import {
  BottomLeftText,
  CenteredText,
  Node,
} from '../../../../../components/Graph';
import FromConnector from '../../EdgeConnectors/FromConnector';
import {
  connectGraphNodeHeight,
  connectGraphNodeWidth,
} from '../../../constants/constants';
import { CommonNodeProps } from '../types';

import styles from '../OutputNode/OutputNode.module.css';

const NodeRefNode = (props: CommonNodeProps) => {
  const onClickFromConnector = () => {};
  const { node } = props;
  return (
    <Node
      height={connectGraphNodeHeight}
      onMouseDown={props.onStartDrag}
      onMouseUp={props.onStopDrag}
      styles={styles.outputNode}
      width={connectGraphNodeWidth}
      x={node.x}
      y={node.y}
    >
      <CenteredText
        nodeHeight={connectGraphNodeHeight}
        nodeWidth={connectGraphNodeWidth}
      >
        {node.name}
      </CenteredText>
      <BottomLeftText
        styles={styles.nodeRefNodeBottomText}
        nodeHeight={connectGraphNodeHeight}
        nodeWidth={connectGraphNodeWidth}
      >
        Node reference
      </BottomLeftText>
      <FromConnector onClick={onClickFromConnector} />
    </Node>
  );
};

export default NodeRefNode;
