import { atom, atomFamily } from 'recoil';

import { Edge } from '../../../api/edges';

export const edgeIdsState = atom<number[]>({
  key: 'edgeIdsState',
  default: [],
});

export const edgeState = atomFamily<Edge, number>({
  key: 'edgeState',
  default: {} as Edge,
});
