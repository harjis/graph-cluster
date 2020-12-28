import { atom, atomFamily, selector, selectorFamily } from 'recoil';

import { fetchNodes, Node } from '../../../api/nodes';
import { currentGraphIdQuery } from './graph';

export const nodesState = atom<Node[]>({
  key: 'nodesState',
  default: selector({
    key: 'nodesState/default',
    get: ({ get }) => {
      const currentGraphId = get(currentGraphIdQuery);
      return fetchNodes(currentGraphId);
    },
  }),
});

export const nodesQuery = selector<Node[]>({
  key: 'nodesQuery',
  get: ({ get }) => get(nodesState),
});

export const nodeIdsQuery = selector<number[]>({
  key: 'nodeIdsQuery',
  get: ({ get }) => get(nodesQuery).map((node) => node.id),
});

type NodeStateParams = {
  nodeId: number;
};
export const nodeState = atomFamily<Node, NodeStateParams>({
  key: 'nodeState',
  default: selectorFamily({
    key: 'nodeState/default',
    get: ({ nodeId }) => ({ get }) => {
      const node = get(nodesState).find((node) => node.id === nodeId);
      if (node === undefined) {
        throw new Error(`Node with id ${nodeId} was not found`);
      }
      return node;
    },
  }),
});

export const nodeQuery = selectorFamily<Node, number>({
  key: 'nodeQuery',
  get: (nodeId) => ({ get }) => get(nodeState({ nodeId })),
});
