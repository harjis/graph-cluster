import fetchMock from 'fetch-mock';
import React, { Suspense } from 'react';
import { Meta, Story } from '@storybook/react';
import { RecoilRoot, useRecoilState } from 'recoil';

import { createEdge, createGraph, createNode } from './story_utils';
import { currentGraphIdState } from '../atoms/graph';
import { DataGraph } from '../components/DataGraph/DataGraph';
import { Loading } from '../../../components/Loading';

import { url } from '../../../api/common';

const graph = createGraph();
const nodes = [
  createNode(graph.id),
  { ...createNode(graph.id), x: 300, y: 300, type: 'OutputNode' },
];
const edges = [createEdge(nodes[0].id, nodes[1].id)];
fetchMock.get(`${url}/graphs/${graph.id}`, graph);
fetchMock.get(`${url}/graphs/${graph.id}/nodes`, nodes);
fetchMock.get(`${url}/graphs/${graph.id}/edges`, edges);

fetchMock.post(`${url}/graphs/${graph.id}/nodes`, {
  ...createNode(graph.id),
  x: 0,
  y: 0,
});

fetchMock.put(`${url}/graphs/${graph.id}/nodes/${nodes[0].id}`, nodes[0]);
fetchMock.put(`${url}/graphs/${graph.id}/nodes/${nodes[1].id}`, nodes[1]);

export default {
  title: 'DataGraph/Graph',
  component: DataGraph,
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Suspense fallback={<Loading />}>
          <Story />
        </Suspense>
      </RecoilRoot>
    ),
  ],
} as Meta;

const Template: Story = () => {
  const [graphId, setCurrentGraphId] = useRecoilState(currentGraphIdState);
  React.useEffect(() => {
    setCurrentGraphId(graph.id);
  }, [setCurrentGraphId]);

  if (graphId === null) {
    return <div>Not loaded</div>;
  }

  return <DataGraph />;
};

export const Default = Template.bind({});
Default.args = {};
