import { atom, atomFamily, selector, selectorFamily } from 'recoil';

import { currentGraphIdQuery } from './graph';
import { Edge, fetchEdges } from '../../../api/edges';

export const edgesState = atom({
  key: 'edgesState',
  default: selector({
    key: 'edgesState/default',
    get: ({ get }) => {
      const currentGraphId = get(currentGraphIdQuery);
      return fetchEdges(currentGraphId);
    },
  }),
});

export const edgeIdsQuery = selector<number[]>({
  key: 'edgeIdsQuery',
  get: ({ get }) => get(edgesState).map((edge) => edge.id),
});

export const edgeState = atomFamily<Edge, number>({
  key: 'edgeState',
  default: selectorFamily({
    key: 'edgeState/default',
    get: (edgeId) => ({ get }) => {
      const edge = get(edgesState).find((edge) => edge.id === edgeId);
      if (edge === undefined) {
        throw new Error(`Edge with id ${edgeId} was not found`);
      }
      return edge;
    },
  }),
});

export const edgeQuery = selectorFamily<Edge, number>({
  key: 'edgeQuery',
  get: (edgeId) => ({ get }) => get(edgeState(edgeId)),
});
