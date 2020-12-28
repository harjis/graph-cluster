import { atomFamily, selectorFamily } from 'recoil';

import { fetchNodes, Node } from '../../../api/nodes';

export const nodesState = atomFamily<Node[], number>({
  key: 'nodesState',
  default: (graphId) => fetchNodes(graphId),
});

export const nodesQuery = selectorFamily<Node[], number>({
  key: 'nodesQuery',
  get: (graphId) => ({ get }) => get(nodesState(graphId)),
});

export const nodeIdsQuery = selectorFamily<number[], number>({
  key: 'nodeIdsQuery',
  get: (graphId) => ({ get }) =>
    get(nodesQuery(graphId)).map((node) => node.id),
});

type NodeStateParams = {
  graphId: number;
  nodeId: number;
};
export const nodeState = atomFamily<Node, NodeStateParams>({
  key: 'nodeState',
  default: selectorFamily({
    key: 'nodeState/default',
    get: ({ nodeId, graphId }) => ({ get }) => {
      const node = get(nodesState(graphId)).find((node) => node.id === nodeId);
      if (node === undefined) {
        throw new Error(`Node with id ${nodeId} was not found`);
      }
      return node;
    },
  }),
});
