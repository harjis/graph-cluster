import { getRandomInt } from '../../../utils/math_util';
import { Node } from '../../../api/nodes';

const handlers = {
  onMouseDown: () => {},
  onMouseUp: () => {},
};
export const inputHandlers = {
  ...handlers,
  onClickFromConnector: () => {},
  onDrag: () => {},
  onStopDrag: () => {},
};
export const outputHandlers = {
  ...handlers,
  onClickToConnector: () => {},
  onDrag: () => {},
  onStopDrag: () => {},
};

export const createNode = (
  graph_id: number = 0,
  x: number = 100,
  y: number = 100
): Node => ({
  errors: {},
  graph_id,
  id: getRandomInt(),
  name: 'New node',
  to_edge_ids: [],
  type: 'InputNode',
  x,
  y,
});
