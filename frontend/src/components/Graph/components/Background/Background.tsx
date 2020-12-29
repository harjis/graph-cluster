import React from 'react';
import { BackgroundRect } from './BackgroundRect';

type Props = {
  height: number;
  patternComponent: React.FC<{ patternId: string }>;
  patternId: string;
  width: number;
};

export const Background: React.FC<Props> = (props) => {
  const PatternComponent = props.patternComponent;
  return (
    <React.Fragment>
      <defs>
        <PatternComponent patternId={props.patternId} />
      </defs>
      <BackgroundRect
        patternId={props.patternId}
        height={props.height}
        width={props.width}
      />
    </React.Fragment>
  );
};
