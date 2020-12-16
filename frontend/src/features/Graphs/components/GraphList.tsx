import React from 'react';
import { Link } from 'react-router-dom';

import { fetchGraphs, Graph } from '../../../api/graphs';
import { useFetch } from '../../../hooks/useFetch';
import { LoadingState } from '../../../types';

export const GraphList = () => {
  const { data: graphs, error, loadingState } = useFetch<Graph[]>(
    fetchGraphs,
    []
  );

  if (loadingState === LoadingState.LOADING) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!graphs) {
    return <div>Something went wrong :(</div>;
  }

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
