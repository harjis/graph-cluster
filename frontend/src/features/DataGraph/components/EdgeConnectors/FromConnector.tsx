import React from 'react';

import {
  fromConnectorRadius,
  fromConnectorHoverRadius,
  dataGraphNodeHeight,
  dataGraphNodeWidth,
  CONNECTOR_TYPE,
} from '../../constants/constants';

import styles from './FromConnector.module.css';

type Props = {
  onClick: (event: React.MouseEvent) => void;
};
const fromConnectorDataProps = {
  [CONNECTOR_TYPE]: 'from-g',
};
const fromConnectorCircleDataProps = {
  [CONNECTOR_TYPE]: 'from-circle',
};
const FromConnector = (props: Props) => {
  const [isMouseOver, setMouseOver] = React.useState(false);
  return (
    <g
      {...fromConnectorDataProps}
      transform={`translate(${
        dataGraphNodeWidth / 2
      }, ${dataGraphNodeHeight})`}
      onClick={props.onClick}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <circle
        {...fromConnectorCircleDataProps}
        className={styles.connector}
        r={isMouseOver ? fromConnectorHoverRadius : fromConnectorRadius}
      />
    </g>
  );
};

export default FromConnector;
