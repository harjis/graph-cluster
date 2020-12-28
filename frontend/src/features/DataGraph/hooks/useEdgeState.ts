import { useRecoilValue } from 'recoil';
import { edgeQuery } from '../atoms/edges';
import { nodeQuery } from '../atoms/nodes';
import {
  getNodeBottomMiddlePosition,
  getNodeTopMiddlePosition,
} from '../utils/nodeUtils';

type Coordinates = { x: number; y: number };
type Props = {
  edgeId: number;
};
type Return = {
  fromCoordinates: Coordinates;
  toCoordinates: Coordinates;
};
export const useEdgeState = (props: Props): Return => {
  const edge = useRecoilValue(edgeQuery(props.edgeId));
  const toNode = useRecoilValue(nodeQuery(edge.to_node_id));
  const fromNode = useRecoilValue(nodeQuery(edge.from_node_id));

  return {
    fromCoordinates: getNodeBottomMiddlePosition(fromNode),
    toCoordinates: getNodeTopMiddlePosition(toNode),
  };
};
