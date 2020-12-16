import { Graph } from '../features/DataGraph/constants/types';
import { options, url } from './common';

export function fetchGraphs(): Promise<Graph[]> {
  return fetch(`${url}/graphs`, options).then((response) => response.json());
}

export function undoGraph(graphId: number) {
  return fetch(`${url}/graphs/${graphId}/undo`, options).then((response) =>
    response.json()
  );
}

export function resetDb(graphId: number) {
  return fetch(`${url}/graphs/${graphId}/reset`, options).then((response) =>
    response.json()
  );
}
