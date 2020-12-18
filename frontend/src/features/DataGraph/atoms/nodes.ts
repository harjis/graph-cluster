import { atomFamily } from 'recoil';

import { fetchNodes, Node } from '../../../api/nodes';

type Params = number;
export const nodesState = atomFamily<Node[], Params>({
  key: 'nodesState',
  default: (graphId) => fetchNodes(graphId),
});
