import { atom, atomFamily, selector, selectorFamily } from 'recoil';

import { fetchNodes, Node } from '../../../api/nodes';
import { currentGraphIdQuery } from './graph';
import { dataGraphNodeHeight } from '../constants/constants';

export const nodeIdsState = atom<number[]>({
  key: 'nodeIdsState',
  default: [],
});

const tempNode = atomFamily<Node | null, number>({
  key: 'tempNode',
  default: null,
});
export const nodeState = atomFamily<Node, number>({
  key: 'nodeState',
  default: selectorFamily<Node, number>({
    key: 'nodeState/default',
    get: (nodeId) => ({ get }) => {
      const node = get(tempNode(nodeId));
      if (node === null) {
        throw new Error(`Fatal error: Node with id ${nodeId} was not found`);
      }
      return node;
    },
    set: (nodeId) => ({ set }, node) => set(tempNode(nodeId), node),
  }),
});

export const nodeHasToEdgesQuery = selectorFamily<boolean, number>({
  key: 'nodeHasToEdgesQuery',
  get: (nodeId) => ({ get }) => get(nodeState(nodeId)).to_edge_ids.length > 0,
});

export const nodeMaxBottomQuery = selector({
  key: 'nodeMaxBottomQuery',
  get: ({ get }) => {
    const nodeY = get(nodeIdsState).map((nodeId) => get(nodeState(nodeId)).y);
    if (nodeY.length === 0) return 0;
    // +16 -> gutter
    return Math.max(...nodeY) + dataGraphNodeHeight + 16;
  },
});
