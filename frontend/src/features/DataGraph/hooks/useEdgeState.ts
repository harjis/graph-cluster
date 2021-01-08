import { useRecoilValue, useSetRecoilState } from 'recoil';

import { currentGraphIdQuery } from '../atoms/graph';
import { destroyEdge, Edge } from '../../../api/edges';
import {
  edgeFromCoordinates,
  edgesState,
  edgeToCoordinates,
} from '../atoms/edges';
import { useAsyncEffect } from '../../../hooks/useAsyncEffect';

type Coordinates = { x: number; y: number };
type Props = {
  edge: Edge;
};
type Return = {
  deleteEdge: () => void;
  fromCoordinates: Coordinates;
  toCoordinates: Coordinates;
};
export const useEdgeState = (props: Props): Return => {
  const setEdges = useSetRecoilState(edgesState);
  const currentGraphId = useRecoilValue(currentGraphIdQuery);
  const fromCoordinates = useRecoilValue(edgeFromCoordinates(props.edge.id));
  const toCoordinates = useRecoilValue(edgeToCoordinates(props.edge.id));

  // TODO should useAsyncEffect be used here?
  const deleteEdge = useAsyncEffect(async (isMounted) => {
    const wasDeleteSuccess = await destroyEdge(currentGraphId, props.edge.id);
    if (isMounted() && wasDeleteSuccess) {
      setEdges((edges) => edges.filter((edge) => edge.id !== props.edge.id));
    }
  });

  return {
    deleteEdge,
    fromCoordinates,
    toCoordinates,
  };
};
