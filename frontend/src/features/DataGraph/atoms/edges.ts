import { atom, atomFamily, selectorFamily } from 'recoil';

import { Edge } from '../../../api/edges';

export const edgeIdsState = atom<number[]>({
  key: 'edgeIdsState',
  default: [],
});

const tempEdge = atomFamily<Edge | null, number>({
  key: 'tempEdge',
  default: null,
});
export const edgeState = atomFamily<Edge, number>({
  key: 'edgeState',
  default: selectorFamily<Edge, number>({
    key: 'edgeState/default',
    get: (edgeId) => ({ get }) => {
      const edge = get(tempEdge(edgeId));
      if (edge === null) {
        throw new Error(`Fatal error: Edge with id ${edgeId} was not found`);
      }
      return edge;
    },
    set: (edgeId) => ({ set }, edge) => set(tempEdge(edgeId), edge),
  }),
});
