import { useRecoilValue } from 'recoil';

import { edgesState } from '../atoms/edges';
import { Edge } from '../../../api/edges';

type Return = {
  edges: Edge[];
};
export const useDataEdges = (): Return => {
  const edges = useRecoilValue(edgesState);

  return { edges };
};
