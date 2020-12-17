import { atom } from 'recoil';

import { fetchGraphs } from '../api/graphs';

export const graphsState = atom({
  key: 'graphsState',
  default: fetchGraphs(),
});
