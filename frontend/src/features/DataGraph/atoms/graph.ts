import { atomFamily } from 'recoil';

import { fetchGraph, Graph } from '../../../api/graphs';

export const graphState = atomFamily<Graph, number>({
  key: 'graphState',
  default: (graphId) => fetchGraph(graphId),
});
