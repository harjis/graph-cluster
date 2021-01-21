import { atom, selector } from 'recoil';

import { fetchGraphs } from '../api/graphs';

export const graphsState = atom({
  key: 'graphsState',
  default: selector({
    key: 'graphsState/default',
    get: () => {
      return fetchGraphs();
    },
  }),
});
