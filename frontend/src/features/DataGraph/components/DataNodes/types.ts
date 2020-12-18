import React from 'react';

import { Node } from '../../../../api/nodes';

export type CommonNodeProps = {
  onStartDrag: (event: React.MouseEvent) => void;
  onStopDrag: () => void;
  node: Node;
};
