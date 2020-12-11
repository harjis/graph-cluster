import React from 'react';

import styles from './Node.module.css';

type Props = {
  children: React.ReactNode | null | undefined;
  height: number;
  id: number;
  onMouseDown?: (event: React.MouseEvent) => any;
  onMouseUp?: (event: React.MouseEvent) => any;
  styles?: string;
  width: number;
  x: number;
  y: number;
};

// Notice: Event handlers should not be attached to g. If you have components with handlers inside Node
// it would make these handlers fire as well.
export const Node = (props: Props) => (
  <g transform={`translate(${props.x}, ${props.y})`}>
    <rect
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      className={props.styles || styles.container}
      height={props.height}
      width={props.width}
    />
    {props.children}
  </g>
);
