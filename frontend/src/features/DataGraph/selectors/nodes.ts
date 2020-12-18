import { selectorFamily } from 'recoil';
import { nodesState } from '../atoms/nodes';
import { Node } from '../../../api/nodes';

export const nodeIdsQuery = selectorFamily<number[], number>({
  key: 'nodeIdsQuery',
  get: (graphId) => ({ get }) =>
    get(nodesState(graphId)).map((node) => node.id),
});

type NodeQueryParams = {
  graphId: number;
  nodeId: number;
};
export const nodeQuery = selectorFamily<Node, NodeQueryParams>({
  key: 'nodeQuery',
  get: ({ nodeId, graphId }) => ({ get }) => {
    const node = get(nodesState(graphId)).find((node) => node.id === nodeId);
    if (node === undefined) {
      throw new Error(`Node with ID: ${nodeId} was not found`);
    }
    return node;
  },
});
