import React from 'react';

import { DataNode } from './DataNode';
import { useDataNodes } from '../../hooks/useDataNodes';

type Props = {
  canvasRef: React.RefObject<SVGSVGElement>;
};
export const DataNodes: React.FC<Props> = (props) => {
  const { nodes } = useDataNodes();
  return (
    <>
      {nodes.map((node) => (
        <DataNode canvasRef={props.canvasRef} key={node.id} node={node} />
      ))}
    </>
  );
};
