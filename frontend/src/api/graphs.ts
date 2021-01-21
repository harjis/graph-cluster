import { options, url } from './common';

export type Graph = {
  id: number;
  name: string;
};

export function fetchGraphs(): Promise<Graph[]> {
  return fetch(`${url}/graphs`, options()).then((response) => response.json());
}

export function fetchGraph(graphId: number): Promise<Graph> {
  return fetch(`${url}/graphs/${graphId}`, options()).then((response) =>
    response.json()
  );
}

export function undoGraph(graphId: number) {
  return fetch(`${url}/graphs/${graphId}/undo`, options()).then((response) =>
    response.json()
  );
}
