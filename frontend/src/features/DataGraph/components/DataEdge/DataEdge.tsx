import React from 'react';

import { Edge as EdgeApiType } from '../../../../api/edges';
import { Edge } from '../../../../components/Graph';
import { useEdgeState } from '../../hooks/useEdgeState';

import styles from './DataEdge.module.css';

type Props = {
  edge: EdgeApiType;
};
const DataEdge = (props: Props) => {
  const { fromCoordinates, toCoordinates, deleteEdge } = useEdgeState(props);
  return (
    <g>
      <Edge
        from={fromCoordinates}
        onClick={deleteEdge}
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
