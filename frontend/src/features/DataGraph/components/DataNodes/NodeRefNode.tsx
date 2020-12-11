import React from 'react';

import {
  BottomLeftText,
  CenteredText,
  Node,
} from '../../../../components/Graph';
import FromConnector from '../EdgeConnectors/FromConnector';
import {
  connectGraphNodeHeight,
  connectGraphNodeWidth,
} from '../../constants/constants';

import styles from './OutputNode.module.css';

// NOTICE: Props can not be exact because of how InputNodes are used.
type Props = {
  children: React.ReactNode | null | undefined;
  id: number;
  name: string;
  onClickFromConnector: (event: React.MouseEvent) => void;
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseUp: (event: React.MouseEvent) => void;
  styles?: string;
  x: number;
  y: number;
};

const NodeRefNode = (props: Props) => (
  <Node
    height={connectGraphNodeHeight}
    id={props.id}
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    styles={styles.outputNode}
    width={connectGraphNodeWidth}
    x={props.x}
    y={props.y}
  >
    <CenteredText
      nodeHeight={connectGraphNodeHeight}
      nodeWidth={connectGraphNodeWidth}
    >
      {props.name}
    </CenteredText>
    <BottomLeftText
      styles={styles.nodeRefNodeBottomText}
      nodeHeight={connectGraphNodeHeight}
      nodeWidth={connectGraphNodeWidth}
    >
      Node reference
    </BottomLeftText>
    <FromConnector onClick={props.onClickFromConnector} />
    {props.children}
  </Node>
);

export default NodeRefNode;
