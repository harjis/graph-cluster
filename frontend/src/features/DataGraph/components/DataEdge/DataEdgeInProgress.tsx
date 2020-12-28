import React from 'react';

import { Edge } from '../../../../components/Graph';
import { useDataEdgeInProgress } from '../../hooks/useDataEdgeInProgress';

import styles from './DataEdgeInProgress.module.css';

type Props = {
  canvasRef: React.RefObject<SVGSVGElement>;
};
const DataEdgeInProgress = (props: Props) => {
  const { fromCoordinates, toCoordinates } = useDataEdgeInProgress(
    props.canvasRef
  );

  if (fromCoordinates === null) {
    return null;
  }
  return (
    <g className={styles.container}>
      <Edge from={fromCoordinates} styles={styles.line} to={toCoordinates} />
      <polygon
        className={styles.triangle}
        transform={`translate(${toCoordinates.x},${toCoordinates.y})`}
        points="-6,0 6,0 0,9"
      />
    </g>
  );
};

export default DataEdgeInProgress;
