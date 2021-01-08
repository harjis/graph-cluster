import React from 'react';
import DataEdge from './DataEdge';
import { useDataEdges } from '../../hooks/useDataEdges';

export const DataEdges = () => {
  const { edges } = useDataEdges();

  return (
    <>
      {edges.map((edge) => (
        <DataEdge key={edge.id} edge={edge} />
      ))}
    </>
  );
};
