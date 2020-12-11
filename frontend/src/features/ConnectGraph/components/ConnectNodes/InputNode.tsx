import React from 'react';

import CenteredText from '../../../../components/Graph/components/NodeContent/CenteredText';
import FromConnector from '../EdgeConnectors/FromConnector';
import Node from '../../../../components/Graph/components/Node/Node';
import {
  connectGraphNodeHeight,
  connectGraphNodeWidth,
} from '../../constants/ConnectGraphConstants';

import styles from './InputNode.module.css';

// NOTICE: Props can not be exact because of how InputNodes are used.
type Props = {
  children: React.ReactNode | null | undefined;
  id: number;
  name: string;
  onClickFromConnector: (event: React.MouseEvent<Element>) => any;
  onMouseDown: (event: React.MouseEvent<Element>) => any;
  onMouseUp: (event: React.MouseEvent<Element>) => any;
  styles?: string;
  x: number;
  y: number;
};

const InputNode = (props: Props) => (
  <Node
    height={connectGraphNodeHeight}
    id={props.id}
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    styles={styles.inputNode}
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
    <FromConnector onClick={props.onClickFromConnector} />
    {props.children}
  </Node>
);

export default InputNode;
