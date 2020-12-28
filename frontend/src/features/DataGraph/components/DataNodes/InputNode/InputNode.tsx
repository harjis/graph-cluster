import React from 'react';

import { CenteredText, Node } from '../../../../../components/Graph';
import FromConnector from '../../EdgeConnectors/FromConnector';
import {
  connectGraphNodeHeight,
  connectGraphNodeWidth,
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
      height={connectGraphNodeHeight}
      onMouseDown={props.onStartDrag}
      onMouseUp={props.onStopDrag}
      styles={styles.inputNode}
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
      <FromConnector onClick={props.onClickFromConnector} />
    </Node>
  );
};

export default InputNode;
