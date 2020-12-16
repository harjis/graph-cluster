import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { graphsState } from '../../../atoms/graphs';
import { Loading } from '../../../components/Loading';

const Graphs = () => {
  const [graphs] = useRecoilState(graphsState);
  return (
    <ul>
      {graphs.map((graph) => (
        <li key={graph.id}>
          <Link to={`/graphs/${graph.id}`}>{graph.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export const GraphList = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Graphs />
    </Suspense>
  );
};
