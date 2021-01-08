import { atom, selector, selectorFamily } from 'recoil';

import { Edge, fetchEdges } from '../../../api/edges';
import { currentGraphIdQuery } from './graph';
import { nodeQuery } from './nodes';
import {
  getNodeBottomMiddlePosition,
  getNodeTopMiddlePosition,
} from '../utils/nodeUtils';

export const edgesState = atom<Edge[]>({
  key: 'edgesState',
  default: selector({
    key: 'edgesState/default',
    get: ({ get }) => {
      const currentGraphId = get(currentGraphIdQuery);
      return fetchEdges(currentGraphId);
    },
  }),
});

export const edgeQuery = selectorFamily<Edge, number>({
  key: 'edgeQuery',
  get: (edgeId) => ({ get }) => {
    const edge = get(edgesState).find((edge) => edge.id === edgeId);
    if (!edge) {
      throw new Error(`No edge found with id: ${edgeId}`);
    }
    return edge;
  },
});

type Coordinates = {
  x: number;
  y: number;
};

export const edgeFromCoordinates = selectorFamily<Coordinates, number>({
  key: 'edgeFromCoordinates',
  get: (edgeId) => ({ get }) => {
    const edge = get(edgeQuery(edgeId));
    const fromNode = get(nodeQuery(edge.from_node_id));

    return getNodeBottomMiddlePosition(fromNode);
  },
});

export const edgeToCoordinates = selectorFamily<Coordinates, number>({
  key: 'edgeToCoordinates',
  get: (edgeId) => ({ get }) => {
    const edge = get(edgeQuery(edgeId));
    const toNode = get(nodeQuery(edge.to_node_id));

    return getNodeTopMiddlePosition(toNode);
  },
});
