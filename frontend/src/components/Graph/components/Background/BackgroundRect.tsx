import React from 'react';

type Props = {
  height: number;
  patternId: string;
  width: number;
};
export const BackgroundRect = (props: Props) => (
  <rect
    x="0"
    y="0"
    width={props.width}
    height={props.height}
    fill={`url(#${props.patternId})`}
  />
);
