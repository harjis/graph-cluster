import { useRecoilValue, useSetRecoilState } from 'recoil';

import { currentGraphIdQuery } from '../atoms/graph';
import { destroyEdge } from '../../../api/edges';
import { edgeIdsState, edgeState } from '../atoms/edges';
import {
  getNodeBottomMiddlePosition,
  getNodeTopMiddlePosition,
} from '../utils/nodeUtils';
import { nodeState } from '../atoms/nodes';
import { useAsyncEffect } from '../../../hooks/useAsyncEffect';

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
  const currentGraphId = useRecoilValue(currentGraphIdQuery);
  const setEdgeIdsState = useSetRecoilState(edgeIdsState);
  const edge = useRecoilValue(edgeState(props.edgeId));
  const toNode = useRecoilValue(nodeState(edge.to_node_id));
  const fromNode = useRecoilValue(nodeState(edge.from_node_id));

  // TODO should useAsyncEffect be used here?
  const deleteEdge = useAsyncEffect(async (isMounted) => {
    const wasDeleteSuccess = await destroyEdge(currentGraphId, props.edgeId);
    if (isMounted() && wasDeleteSuccess) {
      setEdgeIdsState((edgeIds) =>
        edgeIds.filter((edgeId) => edgeId !== edge.id)
      );
    }
  });

  return {
    deleteEdge,
    fromCoordinates: getNodeBottomMiddlePosition(fromNode),
    toCoordinates: getNodeTopMiddlePosition(toNode),
  };
};
