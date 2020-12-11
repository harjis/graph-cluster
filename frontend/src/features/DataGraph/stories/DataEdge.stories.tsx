import React from 'react';
import { Story, Meta } from '@storybook/react';

import DataEdge from '../components/DataEdge/DataEdge';
import InputNode from '../components/DataNodes/InputNode';
import OutputNode from '../components/DataNodes/OutputNode';
import { Canvas } from '../../../components/Graph';
import { createNode, inputHandlers, outputHandlers } from './story_utils';

const fromNode = createNode(0, 10, 10);
const toNode = createNode(0, 200, 200);
export default {
  title: 'DataGraph/Edge',
  component: DataEdge,
} as Meta;

const Template: Story = () => (
  <Canvas height={500} width={500}>
    {() => <DataEdge onClick={() => {}} fromNode={fromNode} toNode={toNode} />}
  </Canvas>
);

const WithNodesTemplate: Story = () => (
  <Canvas height={500} width={500}>
    {() => (
      <React.Fragment>
        <InputNode
          name={fromNode.name}
          id={fromNode.id}
          x={fromNode.x}
          y={fromNode.y}
          {...inputHandlers}
        >
          {null}
        </InputNode>
        <OutputNode
          canConnect={false}
          hasToEdges={true}
          name={toNode.name}
          id={toNode.id}
          x={toNode.x}
          y={toNode.y}
          {...outputHandlers}
        >
          {null}
        </OutputNode>
        <DataEdge onClick={() => {}} fromNode={fromNode} toNode={toNode} />
      </React.Fragment>
    )}
  </Canvas>
);

export const Default = Template.bind({});
Default.args = {};

export const WithNodes = WithNodesTemplate.bind({});
WithNodes.args = {};
