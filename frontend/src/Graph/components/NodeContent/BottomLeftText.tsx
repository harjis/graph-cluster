import React from 'react';

import styles from './CenteredText.module.css';

type Props = {
  children: React.ReactNode | null | undefined;
  styles?: string;
  nodeHeight: number;
  nodeWidth: number;
};
const BottomLeftText = (props: Props) => (
  <g
    className={props.styles || styles.text}
    transform={`translate(4, ${props.nodeHeight - 4})`}
  >
    <text>{props.children}</text>
  </g>
);

export default BottomLeftText;
