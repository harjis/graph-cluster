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
  onClickToConnector: () => void;
};
const OutputNode = (props: Props) => {
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
      <ToConnector
        canConnect={props.canConnect}
        hasToEdges={props.hasToEdges}
        onClick={props.onClickToConnector}
      />
    </Node>
  );
};

export default OutputNode;
