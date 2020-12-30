import { Node } from '../../../../api/nodes';

type Coordinates = {
  x: number;
  y: number;
};
export type CommonNodeProps = {
  onDrag: (coordinates: Coordinates) => void;
  onStopDrag: (coordinates: Coordinates) => void;
  node: Node;
};
