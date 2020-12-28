import React from 'react';

import { Edge } from '../../../../components/Graph';
import { useEdgeState } from '../../hooks/useEdgeState';

import styles from './DataEdge.module.css';

type Props = {
  edgeId: number;
};
const DataEdge = (props: Props) => {
  const { fromCoordinates, toCoordinates } = useEdgeState(props);
  return (
    <g>
      <Edge
        from={fromCoordinates}
        onClick={() => {}}
        styles={styles.line}
        to={toCoordinates}
      />
      <polygon
        className={styles.triangle}
        transform={`translate(${toCoordinates.x},${toCoordinates.y})`}
        points="-6,0 6,0 0,9"
      />
    </g>
  );
};

export default DataEdge;
