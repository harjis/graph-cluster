import { atomFamily } from 'recoil';

import { fetchGraph, Graph } from '../../../api/graphs';

type Params = number;
export const graphState = atomFamily<Graph, Params>({
  key: 'graphState',
  default: (graphId) => fetchGraph(graphId),
});
