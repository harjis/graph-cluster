import React from 'react';

import { CenteredText, Node } from '../../../../../components/Graph';
import ToConnector from '../../EdgeConnectors/ToConnector';
import {
  connectGraphNodeHeight,
  connectGraphNodeWidth,
} from '../../../constants/constants';

import styles from './OutputNode.module.css';
import { CommonNodeProps } from '../types';

type Props = CommonNodeProps & {
  canConnect: boolean;
  hasToEdges: boolean;
};
const OutputNode = (props: Props) => {
  const onClickToConnector = () => {};
  const canConnect = false;
  const hasToEdges = false;
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
      <ToConnector
        canConnect={canConnect}
        hasToEdges={hasToEdges}
        onClick={onClickToConnector}
      />
    </Node>
  );
};

export default OutputNode;
