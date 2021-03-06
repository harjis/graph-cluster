import { options, url } from './common';
import { Errors } from '../types';

export type NodeType = 'InputNode' | 'OutputNode' | 'NodeRefNode';
export type Node = {
  errors: Errors;
  graph_id: number;
  id: number;
  name: string;
  to_edge_ids: number[];
  type: NodeType;
  x: number;
  y: number;
};

export function createNode(graphId: number, type: NodeType): Promise<Node> {
  return fetch(
    `${url}/graphs/${graphId}/nodes`,
    options({
      method: 'POST',
      body: JSON.stringify({ name: 'New Node!', type }),
    })
  ).then((response) => response.json());
}

export function fetchNodes(graphId: number): Promise<Node[]> {
  return fetch(`${url}/graphs/${graphId}/nodes`, options()).then((response) =>
    response.json()
  );
}

export function updateNode(node: Partial<Node>): Promise<boolean> {
  const { id, graph_id, ...rest } = node;
  return fetch(
    `${url}/graphs/${graph_id}/nodes/${id}`,
    options({ method: 'PUT', body: JSON.stringify(rest) })
  ).then((response) => response.json());
}
