import React from 'react';
import { useRecoilValue } from 'recoil';

import { nodeQuery } from '../../../selectors/nodes';
import { CenteredText, Node } from '../../../../../components/Graph';
import ToConnector from '../../EdgeConnectors/ToConnector';
import {
  connectGraphNodeHeight,
  connectGraphNodeWidth,
} from '../../../constants/constants';

import styles from './OutputNode.module.css';
import { Props } from '../types';

const OutputNode = (props: Props) => {
  const onMouseDown = () => {};
  const onMouseUp = () => {};
  const onClickToConnector = () => {};
  const canConnect = false;
  const hasToEdges = false;
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
      <ToConnector
        canConnect={canConnect}
        hasToEdges={hasToEdges}
        onClick={onClickToConnector}
      />
    </Node>
  );
};

export default OutputNode;
