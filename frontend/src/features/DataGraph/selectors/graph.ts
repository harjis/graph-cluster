import { selectorFamily } from 'recoil';

import { graphState } from '../atoms/graph';
import { Graph } from '../../../api/graphs';

type GraphWithNodeIds = Graph & { nodeIds: number[] };
export const graphQuery = selectorFamily<GraphWithNodeIds, number>({
  key: 'graphQuery',
  get: (graphId) => ({ get }) => {
    const { graph, nodes } = get(graphState(graphId));
    return { ...graph, nodeIds: nodes.map((node) => node.id) };
  },
});
