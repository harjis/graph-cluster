import React from 'react';

import {
  connectGraphNodeWidth,
  CONNECTOR_TYPE,
} from '../../constants/constants';

import styles from './ToConnector.module.css';

// ToConnector needs hasConnections can because of how SVG works. Edges need to be drawn first so that
// they are rendered under everything else. If ToConnector has connections it means that the Edge arrow
// is rendered under the Node.
type Props = {
  canConnect: boolean;
  hasToEdges?: boolean;
  onClick: (event: React.MouseEvent) => void;
};
const toPolygonBackgroundDataProps = {
  [CONNECTOR_TYPE]: 'to-polygon-background',
};
const toPolygonOverlayDataProps = {
  [CONNECTOR_TYPE]: 'to-polygon-overlay',
};
const toConnectorDataProps = {
  [CONNECTOR_TYPE]: 'to-g',
};

const ToConnector = (props: Props) => (
  <g
    {...toConnectorDataProps}
    className={props.canConnect ? styles.canConnect : undefined}
    transform={`translate(${connectGraphNodeWidth / 2}, 0)`}
    onClick={props.onClick}
  >
    <polygon
      {...toPolygonBackgroundDataProps}
      className={styles.connector}
      points="-8,0 8,0 0,12"
    />
    {props.hasToEdges && (
      <polygon
        {...toPolygonOverlayDataProps}
        className={styles.connectedConnector}
        points="-6,0 6,0 0,9"
      />
    )}
  </g>
);

export default ToConnector;
