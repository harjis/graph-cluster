import React from 'react';

import { getOriginToOriginBezierPath } from '../../utils/bezierUtils';

import styles from './Edge.module.css';

type Coordinate = { x: number; y: number };
type Props = {
  from: Coordinate;
  onClick?: () => void;
  styles?: string;
  to: Coordinate;
};
export const Edge = (props: Props) => (
  <path
    onClick={props.onClick}
    d={getOriginToOriginBezierPath(props.from, props.to)}
    className={props.styles || styles.default}
  />
);
