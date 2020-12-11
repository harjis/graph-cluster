import InputNode from '../components/DataNodes/InputNode';
import NodeRefNode from '../components/DataNodes/NodeRefNode';
import OutputNode from '../components/DataNodes/OutputNode';
import { NodeType } from '../constants/types';

type NodeComponent = typeof InputNode | typeof OutputNode | typeof NodeRefNode;
const componentMap = new Map<NodeType, NodeComponent>([
  ['InputNode', InputNode],
  ['OutputNode', OutputNode],
  ['NodeRefNode', NodeRefNode],
]);
export function getComponentByType(type: NodeType): NodeComponent {
  const component = componentMap.get(type);
  if (!component)
    throw Error('Tried to create unsupported node component:' + type);
  return component;
}
