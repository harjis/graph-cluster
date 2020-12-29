import {
  DEFAULT_NODE_HEIGHT,
  DEFAULT_NODE_WIDTH,
} from '../../../components/Graph/constants/GraphConstants';
import { Node } from '../../../api/nodes';

type Coordinates = {
  x: number;
  y: number;
};
export function getNodeBottomMiddlePosition(node: Node): Coordinates {
  return {
    x: node.x + DEFAULT_NODE_WIDTH / 2,
    y: node.y + DEFAULT_NODE_HEIGHT,
  };
}

export function getNodeTopMiddlePosition(node: Node): Coordinates {
  return {
    x: node.x + DEFAULT_NODE_WIDTH / 2,
    y: node.y,
  };
}

export function getNode(nodes: Node[], nodeId: number): Node {
  const node = nodes.find((node) => node.id === nodeId);
  if (!node) throw Error(`No node found with primary key: ${nodeId}`);
  return node;
}

export const getMaxHeight = (nodeMaxBottom: number, domHeight: number) =>
  Math.max(domHeight, nodeMaxBottom);
