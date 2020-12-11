import React from 'react';

import { CenteredText, Node } from '../../../../components/Graph';
import ToConnector from '../EdgeConnectors/ToConnector';
import {
  connectGraphNodeHeight,
  connectGraphNodeWidth,
} from '../../constants/constants';

import styles from './OutputNode.module.css';

// NOTICE: Props can not be exact because of how InputNodes are used.
type Props = {
  canConnect: boolean;
  children: React.ReactNode | null | undefined;
  hasToEdges: boolean;
  id: number;
  name: string;
  onClickToConnector: (event: React.MouseEvent) => void;
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseUp: (event: React.MouseEvent) => void;
  styles?: string;
  x: number;
  y: number;
};

const OutputNode = (props: Props) => (
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
    <ToConnector
      canConnect={props.canConnect}
      hasToEdges={props.hasToEdges}
      onClick={props.onClickToConnector}
    />
    {props.children}
  </Node>
);

export default OutputNode;
