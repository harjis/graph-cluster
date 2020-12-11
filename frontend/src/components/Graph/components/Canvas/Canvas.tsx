import React from 'react';
import shortid from 'shortid';

import styles from './Canvas.module.css';

type ChildrenProps = {
  canvasId: string;
};
type Props = {
  children: (props: ChildrenProps) => React.ReactNode | null | undefined;
  height: number;
  width: number;
};

export const Canvas = React.forwardRef<SVGSVGElement, Props>((props, ref) => {
  const [canvasId] = React.useState(shortid.generate());
  return (
    <svg
      ref={ref}
      className={styles.container}
      height={props.height}
      width={props.width}
    >
      {props.children({ canvasId })}
    </svg>
  );
});
