import { selectorFamily } from 'recoil';

import { graphState } from '../atoms/graph';
import { Node, NodeType } from '../../../api/nodes';

type Params = {
  graphId: number;
  nodeId: number;
};
export const nodeQuery = selectorFamily<Node, Params>({
  key: 'nodeQuery',
  get: ({ graphId, nodeId }) => ({ get }) => {
    const { nodes } = get(graphState(graphId));
    const node = nodes.find((node) => node.id === nodeId);
    if (node === undefined) {
      throw new Error(`Node with ID: ${nodeId} was not found`);
    }
    return node;
  },
});

export const nodeTypeQuery = selectorFamily<NodeType, Params>({
  key: 'nodeTypeQuery',
  get: ({ graphId, nodeId }) => ({ get }) => {
    const node = get(nodeQuery({ graphId, nodeId }));
    return node.type;
  },
});
