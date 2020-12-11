import React from 'react';
import { Story, Meta } from '@storybook/react';

import Canvas from '../../Graph/components/Canvas/Canvas';
import ConnectEdge from '../components/ConnectEdge/ConnectEdge';
import InputNode from '../components/ConnectNodes/InputNode';
import OutputNode from '../components/ConnectNodes/OutputNode';
import { createNode, inputHandlers, outputHandlers } from './story_utils';

const fromNode = createNode(0, 10, 10);
const toNode = createNode(0, 200, 200);
export default {
  title: 'ConnectGraph/Edge',
  component: ConnectEdge,
} as Meta;

const Template: Story = () => (
  <Canvas height={500} width={500}>
    {() => (
      <ConnectEdge onClick={() => {}} fromNode={fromNode} toNode={toNode} />
    )}
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
        <ConnectEdge onClick={() => {}} fromNode={fromNode} toNode={toNode} />
      </React.Fragment>
    )}
  </Canvas>
);

export const Default = Template.bind({});
Default.args = {};

export const WithNodes = WithNodesTemplate.bind({});
WithNodes.args = {};
