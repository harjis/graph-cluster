import React from 'react';

import { CenteredText, Node } from '../../../../../components/Graph';
import FromConnector from '../../EdgeConnectors/FromConnector';
import {
  dataGraphNodeHeight,
  dataGraphNodeWidth,
} from '../../../constants/constants';
import { CommonNodeProps } from '../types';

import styles from './InputNode.module.css';

type Props = CommonNodeProps & {
  onClickFromConnector: (event: React.MouseEvent) => void;
};
const InputNode = (props: Props) => {
  const { node } = props;

  return (
    <Node
      height={dataGraphNodeHeight}
      onDrag={props.onDrag}
      onStopDrag={props.onStopDrag}
      styles={styles.inputNode}
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
      <FromConnector onClick={props.onClickFromConnector} />
    </Node>
  );
};

export default InputNode;
