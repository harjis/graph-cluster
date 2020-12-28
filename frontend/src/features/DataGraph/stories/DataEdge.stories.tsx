import React from 'react';
import { Story, Meta } from '@storybook/react';

import DataEdge from '../components/DataEdge/DataEdge';
import { Canvas } from '../../../components/Graph';
import { createNode, inputHandlers, outputHandlers } from './story_utils';
import InputNode from '../components/DataNodes/InputNode/InputNode';
import OutputNode from '../components/DataNodes/OutputNode/OutputNode';

const fromNode = createNode(0, 10, 10);
const toNode = createNode(0, 200, 200);
export default {
  title: 'DataGraph/Edge',
  component: DataEdge,
} as Meta;

// const Template: Story = () => (
//   <Canvas height={500} width={500}>
//     {() => <DataEdge fromNode={fromNode} toNode={toNode} />}
//   </Canvas>
// );

// const WithNodesTemplate: Story = () => (
//   <Canvas height={500} width={500}>
//     {() => (
//       <React.Fragment>
//         <InputNode node={fromNode} {...inputHandlers}></InputNode>
//         <OutputNode
//           canConnect={false}
//           hasToEdges={true}
//           node={toNode}
//           {...outputHandlers}
//         ></OutputNode>
//         <DataEdge onClick={() => {}} fromNode={fromNode} toNode={toNode} />
//       </React.Fragment>
//     )}
//   </Canvas>
// );
//
// export const Default = Template.bind({});
// Default.args = {};
//
// export const WithNodes = WithNodesTemplate.bind({});
// WithNodes.args = {};
