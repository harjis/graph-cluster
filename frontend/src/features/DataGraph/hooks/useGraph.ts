import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { currentGraphIdQuery, graphState } from '../atoms/graph';
import { edgeIdsState, edgeState } from '../atoms/edges';
import { fetchEdges } from '../../../api/edges';
import { createNode, fetchNodes, Node } from '../../../api/nodes';
import { Graph } from '../../../api/graphs';
import { nodeIdsState, nodeState } from '../atoms/nodes';

type Return = {
  addNode: (nodeType: Node['type']) => void;
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
    // TODO nodes need to be rendered first because edges depend on node position
    // it would be better if requests were parallel and rendering was sequential
    loadNodes().then(() => loadEdges());
  }, [loadNodes, loadEdges]);

  const addNode = useRecoilCallback(
    ({ set, snapshot }) => async (nodeType: Node['type']) => {
      const newInputNode = await createNode(currentGraphId, nodeType);
      const prevNodeIds = await snapshot.getPromise(nodeIdsState);
      set(nodeIdsState, prevNodeIds.concat(newInputNode.id));
      set(nodeState(newInputNode.id), newInputNode);
    },
    []
  );

  return {
    addNode,
    graph,
    nodeIds,
    edgeIds,
  };
};