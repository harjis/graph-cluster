import React from 'react';
import { useRecoilValue } from 'recoil';

import { Props } from './types';
import { nodeTypeQuery } from '../../selectors/nodes';
import { getComponentByType } from '../../utils/nodeComponentUtil';

export const ParentNode: React.FC<Props> = (props) => {
  const nodeType = useRecoilValue(
    nodeTypeQuery({ graphId: props.graphId, nodeId: props.id })
  );
  const NodeComponent = getComponentByType(nodeType);

  return <NodeComponent id={props.id} graphId={props.graphId} />;
};
