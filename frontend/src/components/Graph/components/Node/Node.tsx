import React from 'react';

import { useDraggable, Coordinates } from '../../../../hooks/useDraggable';

import styles from './Node.module.css';

type Props = {
  children: React.ReactNode | null | undefined;
  height: number;
  onDrag: (coordinates: Coordinates) => void;
  onStopDrag: (coordinates: Coordinates) => void;
  styles?: string;
  width: number;
  x: number;
  y: number;
};

// Notice: Event handlers should not be attached to g. If you have components with handlers inside Node
// it would make these handlers fire as well.
export const Node = (props: Props) => {
  const { coordinates, startDrag } = useDraggable({
    coordinates: { x: props.x, y: props.y },
    onStopDrag: props.onStopDrag,
    onDrag: props.onDrag,
  });
  return (
    <g transform={`translate(${coordinates.x}, ${coordinates.y})`}>
      <rect
        onMouseDown={startDrag}
        className={props.styles || styles.container}
        height={props.height}
        width={props.width}
      />
      {props.children}
    </g>
  );
};
