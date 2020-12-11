import React from 'react';

import { Edge } from '../../../../components/Graph';
import { Node } from '../../constants/types';
import {
  getNodeBottomMiddlePosition,
  getNodeTopMiddlePosition,
} from '../../utils/nodeUtils';

import styles from './DataEdge.module.css';

type Props = {
  fromNode: Node;
  onClick?: () => void;
  toNode: Node;
};
const DataEdge = (props: Props) => {
  const to = getNodeTopMiddlePosition(props.toNode);
  return (
    <g>
      <Edge
        from={getNodeBottomMiddlePosition(props.fromNode)}
        onClick={props.onClick}
        styles={styles.line}
        to={to}
      />
      <polygon
        className={styles.triangle}
        transform={`translate(${to.x},${to.y})`}
        points="-6,0 6,0 0,9"
      />
    </g>
  );
};

export default DataEdge;
