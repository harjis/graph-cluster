import { atom, selector, selectorFamily } from 'recoil';

import { fetchNodes, Node } from '../../../api/nodes';
import { currentGraphIdQuery } from './graph';
import { dataGraphNodeHeight } from '../constants/constants';

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

export const nodeQuery = selectorFamily<Node, number>({
  key: 'nodeQuery',
  get: (nodeId) => ({ get }) => {
    const node = get(nodesState).find((node) => node.id === nodeId);
    if (node === undefined) {
      throw new Error(`Node with id ${nodeId} was not found`);
    }
    return node;
  },
});

export const nodeHasToEdgesQuery = selectorFamily<boolean, number>({
  key: 'nodeHasToEdgesQuery',
  get: (nodeId) => ({ get }) => get(nodeQuery(nodeId)).to_edge_ids.length > 0,
});

export const nodeMaxBottomQuery = selector({
  key: 'nodeMaxBottomQuery',
  get: ({ get }) => {
    const nodes = get(nodesQuery);
    if (nodes.length === 0) return 0;
    // +16 -> gutter
    return Math.max(...nodes.map((node) => node.y)) + dataGraphNodeHeight + 16;
  },
});
