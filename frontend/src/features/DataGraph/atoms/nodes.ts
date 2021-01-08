import { atom, atomFamily, selector, selectorFamily } from 'recoil';

import { Node } from '../../../api/nodes';
import {
  dataGraphNodeHeight,
  dataGraphNodeWidth,
} from '../constants/constants';

export const nodeIdsState = atom<number[]>({
  key: 'nodeIdsState',
  default: [],
});

export const nodeState = atomFamily<Node, number>({
  key: 'nodeState',
  default: {} as Node,
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

export const nodeMaxRightQuery = selector({
  key: 'nodeMaxRightQuery',
  get: ({ get }) => {
    const nodeY = get(nodeIdsState).map((nodeId) => get(nodeState(nodeId)).x);
    if (nodeY.length === 0) return 0;
    // +16 -> gutter
    return Math.max(...nodeY) + dataGraphNodeWidth + 16;
  },
});
