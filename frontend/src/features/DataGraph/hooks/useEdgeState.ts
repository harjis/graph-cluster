import { useRecoilValue, useSetRecoilState } from 'recoil';

import { edgeIdsState, edgeState } from '../atoms/edges';
import { nodeState } from '../atoms/nodes';
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
  const setEdgeIdsState = useSetRecoilState(edgeIdsState);
  const edge = useRecoilValue(edgeState(props.edgeId));
  const toNode = useRecoilValue(nodeState(edge.to_node_id));
  const fromNode = useRecoilValue(nodeState(edge.from_node_id));

  const deleteEdge = () => {
    setEdgeIdsState((edgeIds) =>
      edgeIds.filter((edgeId) => edgeId !== edge.id)
    );
  };

  return {
    deleteEdge,
    fromCoordinates: getNodeBottomMiddlePosition(fromNode),
    toCoordinates: getNodeTopMiddlePosition(toNode),
  };
};
