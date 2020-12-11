import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Canvas } from '../../../components/Graph';
import InputNode from '../components/DataNodes/InputNode';
import NodeRef from '../components/DataNodes/NodeRefNode';
import OutputNode from '../components/DataNodes/OutputNode';
import { inputHandlers, outputHandlers } from './story_utils';

export default {
  title: 'DataGraph/Nodes',
  component: InputNode,
  decorators: [
    (Story) => (
      <Canvas height={500} width={500}>
        {() => <Story />}
      </Canvas>
    ),
  ],
} as Meta;

export const Input: Story = () => (
  <InputNode name="Input 1" id={1} x={200} y={200} {...inputHandlers}>
    {null}
  </InputNode>
);
Input.args = {};

export const Output: Story = () => (
  <OutputNode
    canConnect={false}
    hasToEdges={false}
    name="Output 1"
    id={1}
    x={200}
    y={200}
    {...outputHandlers}
  >
    {null}
  </OutputNode>
);
Output.args = {};

export const OutputWithToEdges: Story = () => (
  <OutputNode
    canConnect={false}
    hasToEdges={true}
    name="Output 1"
    id={1}
    x={200}
    y={200}
    {...outputHandlers}
  >
    {null}
  </OutputNode>
);
OutputWithToEdges.args = {};

export const NodeRefNode: Story = () => (
  <NodeRef name="Node Ref Node 1" id={1} x={200} y={200} {...inputHandlers}>
    {null}
  </NodeRef>
);
NodeRefNode.args = {};
