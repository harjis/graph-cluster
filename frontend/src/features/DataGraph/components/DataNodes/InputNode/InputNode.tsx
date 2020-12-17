import React from 'react';
import { useRecoilValue } from 'recoil';

import { nodeQuery } from '../../../selectors/nodes';
import { CenteredText, Node } from '../../../../../components/Graph';
import FromConnector from '../../EdgeConnectors/FromConnector';
import {
  connectGraphNodeHeight,
  connectGraphNodeWidth,
} from '../../../constants/constants';
import { Props } from '../types';

import styles from './InputNode.module.css';

const InputNode = (props: Props) => {
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
      <FromConnector onClick={onClickFromConnector} />
    </Node>
  );
};

export default InputNode;
