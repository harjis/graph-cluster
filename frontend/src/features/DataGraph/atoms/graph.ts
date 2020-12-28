import { atom, selector } from 'recoil';

import { fetchGraph, Graph } from '../../../api/graphs';

export const currentGraphIdState = atom<number | null>({
  key: 'currentGraphIdState',
  default: null,
});

export const currentGraphIdQuery = selector({
  key: 'currentGraphIdQuery',
  get: ({ get }) => {
    const currentGraphId = get(currentGraphIdState);
    if (currentGraphId === null) {
      throw new Error('set current graph id');
    }

    return currentGraphId;
  },
});

export const graphState = atom<Graph>({
  key: 'graphState',
  default: selector({
    key: 'graphState/default',
    get: ({ get }) => {
      const currentGraphId = get(currentGraphIdQuery);
      return fetchGraph(currentGraphId);
    },
  }),
});
