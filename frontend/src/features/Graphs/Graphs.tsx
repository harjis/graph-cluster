import React from 'react';
import { Link } from 'react-router-dom';

import { fetchGraphs } from '../ConnectGraph/api/graphs';
import { useFetch } from '../../hooks/useFetch';
import { Graph } from '../ConnectGraph/constants/ConnectGraphTypes';
import { LoadingState } from '../../types';

const Graphs = () => {
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

export default Graphs;
