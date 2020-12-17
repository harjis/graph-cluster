import InputNode from '../components/DataNodes/InputNode/InputNode';
import NodeRefNode from '../components/DataNodes/NodeRefNode/NodeRefNode';
import OutputNode from '../components/DataNodes/OutputNode/OutputNode';
import { NodeType } from '../../../api/nodes';

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
