import { atomFamily } from 'recoil';

import { fetchGraph, Graph } from '../../../api/graphs';
import { fetchNodes, Node } from '../../../api/nodes';
import { Edge, fetchEdges } from '../../../api/edges';

type GraphState = {
  graph: Graph;
  nodes: Node[];
  edges: Edge[];
};
type Params = number;
export const graphState = atomFamily<GraphState, Params>({
  key: 'graphState',
  default: (graphId) => {
    return Promise.all([
      fetchGraph(graphId),
      fetchNodes(graphId),
      fetchEdges(graphId),
    ]).then(([graph, nodes, edges]) => ({ graph, nodes, edges }));
  },
});
