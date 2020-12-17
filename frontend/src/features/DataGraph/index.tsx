import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import DataGraph from './components/DataGraph/DataGraph';
import useDataGraph from './hooks/useDataGraph';

type Params = {
  id: string;
};
export const DataGraphContainer = (props: RouteComponentProps<Params>) => {
  const graphId = props.match.params.id;
  const {
    state,
    onAddInputNode,
    onAddOutputNode,
    onUndo,
    onStartDrag,
    onStopDrag,
    onAddEdge,
    onDeleteEdge,
    onResetDb,
  } = useDataGraph(Number(graphId));

  if (state.nodes.isLoading || state.edges.isLoading) {
    return <div>Loading...</div>;
  }
  if (state.nodes.error || state.edges.error) {
    return <div>Error :(</div>;
  }

  return (
    <DataGraph
      isSaving={state.isSaving}
      edges={state.edges.edges}
      nodes={state.nodes.nodes}
      onAddEdge={onAddEdge}
      onAddInputNode={onAddInputNode}
      onAddOutputNode={onAddOutputNode}
      onDeleteEdge={onDeleteEdge}
      onStartDrag={onStartDrag}
      onStopDrag={onStopDrag}
      onUndo={onUndo}
      onResetDb={onResetDb}
      validationErrors={state.nodes.validationErrors}
    />
  );
};
