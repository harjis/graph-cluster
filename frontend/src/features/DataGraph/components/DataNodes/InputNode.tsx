import React from 'react';

import { CenteredText, Node } from '../../../../components/Graph';
import FromConnector from '../EdgeConnectors/FromConnector';
import {
  connectGraphNodeHeight,
  connectGraphNodeWidth,
} from '../../constants/constants';

import styles from './InputNode.module.css';

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
