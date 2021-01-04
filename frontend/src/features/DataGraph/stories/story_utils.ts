import { getId } from '../../../utils/math_util';
import { Node } from '../../../api/nodes';
import { Graph } from '../../../api/graphs';
import { Edge } from '../../../api/edges';

export const createGraph = (): Graph => ({ id: 1, name: 'Mocked Graph' });

export const createNode = (
  graph_id: number = 0,
  x: number = 100,
  y: number = 100
): Node => ({
  errors: {},
  graph_id,
  id: getId(),
  name: 'New node',
  to_edge_ids: [],
  type: 'InputNode',
  x,
  y,
});

export const createEdge = (fromNodeId: number, toNodeId: number): Edge => ({
  id: getId(),
  from_node_id: fromNodeId,
  to_node_id: toNodeId,
});
