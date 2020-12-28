import React from 'react';

import { Edge } from '../../../../components/Graph';

import styles from './DataEdgeInProgress.module.css';

type Coordinates = { x: number; y: number };
type Props = {
  fromCoordinates: Coordinates;
  toCoordinates: Coordinates;
};
const DataEdgeInProgress = (props: Props) => {
  const to = props.toCoordinates;
  return (
    <g className={styles.container}>
      <Edge from={props.fromCoordinates} styles={styles.line} to={to} />
      <polygon
        className={styles.triangle}
        transform={`translate(${to.x},${to.y})`}
        points="-6,0 6,0 0,9"
      />
    </g>
  );
};

export default DataEdgeInProgress;
