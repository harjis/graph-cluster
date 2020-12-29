import { useRecoilState, useRecoilValue } from 'recoil';
import { edgeQuery, edgesState } from '../atoms/edges';
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
  deleteEdge: () => void;
  fromCoordinates: Coordinates;
  toCoordinates: Coordinates;
};
export const useEdgeState = (props: Props): Return => {
  const [edges, setEdges] = useRecoilState(edgesState);
  const edge = useRecoilValue(edgeQuery(props.edgeId));
  const toNode = useRecoilValue(nodeQuery(edge.to_node_id));
  const fromNode = useRecoilValue(nodeQuery(edge.from_node_id));

  const deleteEdge = () => {
    setEdges(edges.filter((e) => e.id !== edge.id));
  };

  return {
    deleteEdge,
    fromCoordinates: getNodeBottomMiddlePosition(fromNode),
    toCoordinates: getNodeTopMiddlePosition(toNode),
  };
};
