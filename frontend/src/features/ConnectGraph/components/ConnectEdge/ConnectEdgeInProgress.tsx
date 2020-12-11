import React from 'react';

import Edge from '../../../../components/Graph/components/Edge/Edge';
import { Node } from '../../constants/ConnectGraphTypes';
import { getNodeBottomMiddlePosition } from '../../utils/nodeUtils';

import styles from './ConnectEdgeInProgress.module.css';

type Props = {
  fromNode: Node;
  toCoordinates: { x: number; y: number };
};
const ConnectEdgeInProgress = (props: Props) => {
  const to = props.toCoordinates;
  return (
    <g className={styles.container}>
      <Edge
        from={getNodeBottomMiddlePosition(props.fromNode)}
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

export default ConnectEdgeInProgress;
