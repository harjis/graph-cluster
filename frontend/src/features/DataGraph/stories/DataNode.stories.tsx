import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Canvas } from '../../../components/Graph';
import { createNode, inputHandlers, outputHandlers } from './story_utils';
import InputNode from '../components/DataNodes/InputNode/InputNode';
import OutputNode from '../components/DataNodes/OutputNode/OutputNode';

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

const node = createNode();
export const Input: Story = () => <InputNode node={node} {...inputHandlers} />;
Input.args = {};

export const Output: Story = () => (
  <OutputNode
    canConnect={false}
    hasToEdges={false}
    node={node}
    {...outputHandlers}
  />
);
Output.args = {};

export const OutputWithToEdges: Story = () => (
  <OutputNode
    canConnect={false}
    hasToEdges={true}
    node={node}
    {...outputHandlers}
  />
);
OutputWithToEdges.args = {};

export const NodeRefNode: Story = () => (
  <NodeRefNode node={node} {...inputHandlers} />
);
NodeRefNode.args = {};
