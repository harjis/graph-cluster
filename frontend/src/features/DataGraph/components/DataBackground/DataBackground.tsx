import React from 'react';

import {
  Background,
  BackgroundProps,
  DotPattern,
} from '../../../../components/Graph';
import { useRecoilValue } from 'recoil';
import { nodeMaxBottomQuery } from '../../atoms/nodes';
import { getMaxHeight } from '../../utils/nodeUtils';

type Props = {
  containerHeight: number;
  containerWidth: number;
  patternId: BackgroundProps['patternId'];
};
export const DataBackground: React.FC<Props> = (props) => {
  const nodeMaxBottom = useRecoilValue(nodeMaxBottomQuery);
  return (
    <Background
      patternId={props.patternId}
      patternComponent={DotPattern}
      height={getMaxHeight(nodeMaxBottom, props.containerHeight)}
      width={props.containerWidth}
    />
  );
};
