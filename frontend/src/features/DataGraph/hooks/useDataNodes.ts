import { useRecoilValue } from 'recoil';

import { Node } from '../../../api/nodes';
import { nodesState } from '../atoms/nodes';

type Return = {
  nodes: Node[];
};
export const useDataNodes = (): Return => {
  const nodes = useRecoilValue(nodesState);

  return { nodes };
};
