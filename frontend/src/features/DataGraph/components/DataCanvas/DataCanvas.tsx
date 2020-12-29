import React from 'react';
import { useRecoilValue } from 'recoil';

import { Canvas, CanvasProps } from '../../../../components/Graph';
import { nodeMaxBottomQuery } from '../../atoms/nodes';
import { getMaxHeight } from '../../utils/nodeUtils';

type Props = {
  children: CanvasProps['children'];
  containerHeight: number;
  containerWidth: number;
};
export const DataCanvas = React.forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
    const nodeMaxBottom = useRecoilValue(nodeMaxBottomQuery);
    return (
      <Canvas
        ref={ref}
        height={getMaxHeight(nodeMaxBottom, props.containerHeight)}
        width={props.containerWidth}
      >
        {({ canvasId }) => props.children({ canvasId })}
      </Canvas>
    );
  }
);
