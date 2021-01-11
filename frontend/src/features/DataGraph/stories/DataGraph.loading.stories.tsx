import fetchMock from 'fetch-mock';
import React, { Suspense } from 'react';
import { Meta, Story } from '@storybook/react';
import { RecoilRoot, useRecoilState } from 'recoil';

import { createEdge, createGraph, createNode } from './story_utils';
import { currentGraphIdState } from '../atoms/graph';
import { DataGraph } from '../components/DataGraph/DataGraph';
import { Loading } from '../../../components/Loading';

import { url } from '../../../api/common';
import { Graph } from '../../../api/graphs';

export default {
  title: 'DataGraph/Graph-Loading',
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
  const graph = createGraph();
  mockLongLastingRequests(graph);
  const [graphId, setCurrentGraphId] = useRecoilState(currentGraphIdState);
  React.useEffect(() => {
    setCurrentGraphId(graph.id);
  }, [graph, setCurrentGraphId]);

  if (graphId === null) {
    return <div>Not loaded</div>;
  }

  return <DataGraph />;
};

export const Default = Template.bind({});
Default.args = { isLoading: false };

function mockLongLastingRequests(graph: Graph) {
  const tenMinutes = 600000;
  fetchMock.reset();
  const nodes = [
    createNode(graph.id),
    { ...createNode(graph.id), x: 300, y: 300, type: 'OutputNode' },
  ];
  const edges = [createEdge(nodes[0].id, nodes[1].id)];
  fetchMock.get(`${url}/graphs/${graph.id}`, graph);
  fetchMock.get(`${url}/graphs/${graph.id}/nodes`, nodes, {
    delay: tenMinutes,
  });
  fetchMock.get(`${url}/graphs/${graph.id}/edges`, edges, {
    delay: tenMinutes,
  });

  fetchMock.post(`${url}/graphs/${graph.id}/nodes`, {
    ...createNode(graph.id),
    x: 0,
    y: 0,
  });

  fetchMock.put(`${url}/graphs/${graph.id}/nodes/${nodes[0].id}`, nodes[0]);
  fetchMock.put(`${url}/graphs/${graph.id}/nodes/${nodes[1].id}`, nodes[1]);
}
