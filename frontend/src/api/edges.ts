import { options, url } from './common';

export type Edge = {
  from_node_id: number;
  id: number;
  to_node_id: number;
};

export function createEdge(
  graphId: number,
  from_node_id: number,
  to_node_id: number
): Promise<Edge> {
  return fetch(
    `${url}/graphs/${graphId}/edges`,
    options({
      method: 'POST',
      body: JSON.stringify({ from_node_id, to_node_id }),
    })
  ).then((response) => response.json());
}
export function fetchEdges(graphId: number): Promise<Edge[]> {
  return fetch(`${url}/graphs/${graphId}/edges`, options()).then((response) =>
    response.json()
  );
}

export function destroyEdge(graphId: number, edgeId: number): Promise<true> {
  return fetch(
    `${url}/graphs/${graphId}/edges/${edgeId}`,
    options({ method: 'DELETE' })
  ).then((response) => response.json());
}
