import { atom, selector, selectorFamily } from 'recoil';

import { fetchNodes, Node } from '../../../api/nodes';
import {
  dataGraphNodeHeight,
  dataGraphNodeWidth,
} from '../constants/constants';
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

export const nodeQuery = selectorFamily<Node, number>({
  key: 'nodeQuery',
  get: (nodeId) => ({ get }) => {
    const node = get(nodesState).find((node) => node.id === nodeId);
    if (!node) {
      throw new Error(`No node found with id: ${nodeId}`);
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
    const nodeY = get(nodesState).map((node) => node.y);
    if (nodeY.length === 0) return 0;
    // +16 -> gutter
    return Math.max(...nodeY) + dataGraphNodeHeight + 16;
  },
});

export const nodeMaxRightQuery = selector({
  key: 'nodeMaxRightQuery',
  get: ({ get }) => {
    const nodeY = get(nodesState).map((node) => node.x);
    if (nodeY.length === 0) return 0;
    // +16 -> gutter
    return Math.max(...nodeY) + dataGraphNodeWidth + 16;
  },
});
