import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { currentGraphIdQuery, graphState } from '../atoms/graph';
import { edgeIdsState, edgeState } from '../atoms/edges';
import { fetchEdges } from '../../../api/edges';
import { fetchNodes } from '../../../api/nodes';
import { Graph } from '../../../api/graphs';
import { nodeIdsState, nodeState } from '../atoms/nodes';

type Return = {
  graph: Graph;
  nodeIds: number[];
  edgeIds: number[];
};
export const useGraph = (): Return => {
  const currentGraphId = useRecoilValue(currentGraphIdQuery);
  const graph = useRecoilValue(graphState);
  const nodeIds = useRecoilValue(nodeIdsState);
  const edgeIds = useRecoilValue(edgeIdsState);
  const loadNodes = useRecoilCallback(
    ({ set }) => async () => {
      const fetchedNodes = await fetchNodes(currentGraphId);
      const ids = [];
      for (const node of fetchedNodes) {
        ids.push(node.id);
        set(nodeState(node.id), node);
      }
      set(nodeIdsState, ids);
    },
    []
  );

  const loadEdges = useRecoilCallback(
    ({ set }) => async () => {
      const fetchedEdges = await fetchEdges(currentGraphId);
      const ids = [];
      for (const edge of fetchedEdges) {
        ids.push(edge.id);
        set(edgeState(edge.id), edge);
      }
      set(edgeIdsState, ids);
    },
    []
  );

  useEffect(() => {
    loadNodes().then(() => loadEdges());
  }, [loadNodes, loadEdges]);

  return {
    graph,
    nodeIds,
    edgeIds,
  };
};
