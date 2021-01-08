import React from 'react';
import { useRecoilValue } from 'recoil';

import { Canvas, CanvasProps } from '../../../../components/Graph';
import { nodeMaxBottomQuery, nodeMaxRightQuery } from '../../atoms/nodes';
import { getMaxHeight, getMaxWidth } from '../../utils/nodeUtils';

type Props = {
  children: CanvasProps['children'];
  containerHeight: number;
  containerWidth: number;
};
export const DataCanvas = React.forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
    const nodeMaxBottom = useRecoilValue(nodeMaxBottomQuery);
    const nodeMaxRight = useRecoilValue(nodeMaxRightQuery);
    return (
      <Canvas
        ref={ref}
        height={getMaxHeight(nodeMaxBottom, props.containerHeight)}
        width={getMaxWidth(nodeMaxRight, props.containerWidth)}
      >
        {({ canvasId }) => props.children({ canvasId })}
      </Canvas>
    );
  }
);
