import React from 'react';
import { useRecoilValue } from 'recoil';

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
import { Props } from '../types';
import { nodeQuery } from '../../../selectors/nodes';

import styles from '../OutputNode/OutputNode.module.css';

const NodeRefNode = (props: Props) => {
  const onMouseDown = () => {};
  const onMouseUp = () => {};
  const onClickFromConnector = () => {};
  const node = useRecoilValue(
    nodeQuery({ graphId: props.graphId, nodeId: props.id })
  );
  return (
    <Node
      height={connectGraphNodeHeight}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
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
