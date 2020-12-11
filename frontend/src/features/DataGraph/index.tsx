import React from 'react';

import DataGraph from './components/DataGraph/DataGraph';
import useDataGraph from './stores/useDataGraph';

// TODO fix any
const DataGraphRouterContainer = (props: any) => {
  const graphId = props.match.params.id;
  if (!graphId) return <div>Graph ID is missing</div>;
  return <DataGraphContainer graphId={Number(graphId)} />;
};

type ConnectGraphContainerProps = {
  graphId: number;
};
function DataGraphContainer(props: ConnectGraphContainerProps) {
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
  } = useDataGraph(props.graphId);

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
}

export default DataGraphRouterContainer;
