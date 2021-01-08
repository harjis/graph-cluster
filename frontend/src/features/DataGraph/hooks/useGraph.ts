import { useRecoilValue } from 'recoil';

import { graphState } from '../atoms/graph';
import { Graph } from '../../../api/graphs';

type Return = {
  graph: Graph;
};
export const useGraph = (): Return => {
  const graph = useRecoilValue(graphState);

  return {
    graph,
  };
};
