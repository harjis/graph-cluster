import React from 'react';

import DataEdge from '../DataEdge/DataEdge';
import DataEdgeInProgress from '../DataEdge/DataEdgeInProgress';
import NodeActionBar from '../NodeActionBar/NodeActionBar';
import { Background, Canvas, DotPattern } from '../../../../components/Graph';
import { connectGraphNodeHeight } from '../../constants/constants';
import { Errors, Node } from '../../constants/types';
import { getComponentByType } from '../../utils/nodeComponentUtil';
import { getNode } from '../../utils/nodeUtils';
import {
  useDataEdgeInProgress,
  Coordinates,
} from '../../hooks/useDataEdgeInProgress';
import useResizeObserver from '../../../../hooks/useResizeObserver';
import { Edge } from '../../../../api/edges';

import styles from './DataGraph.module.css';

type Props = {
  edges: Edge[];
  nodes: Node[];
  isSaving: boolean;
  onAddEdge: (fromNodeId: number, toNodeId: number) => void;
  onAddInputNode: () => void;
  onAddOutputNode: () => void;
  onDeleteEdge: (edge: Edge) => void;
  onStartDrag: (nodeId: number, event: React.MouseEvent) => void;
  onStopDrag: (event: React.MouseEvent) => void;
  onUndo: () => void;
  onResetDb: () => void;
  validationErrors: Errors;
};
const DataGraph = (props: Props) => {
  const {
    ref,
    edgeInProgressState,
    onStartEdgeInProgress,
    onStopEdgeInProgress,
  } = useDataEdgeInProgress();
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  return (
    <div className={styles.container}>
      <React.Fragment>
        <NodeActionBar
          isSaving={props.isSaving}
          onAddInputNode={props.onAddInputNode}
          onAddOutputNode={props.onAddOutputNode}
          onUndo={props.onUndo}
          onResetDb={props.onResetDb}
          validationErrors={props.validationErrors}
        />
        {/*.container + .innerContainer is a bit of a hack. Try to make it better*/}
        <div
          ref={containerRef}
          data-canvas-container
          className={styles.innerContainer}
        >
          <Canvas
            ref={ref}
            height={getMaxHeight(props.nodes, dimensions.height)}
            width={dimensions.width}
          >
            {({ canvasId }) => (
              <React.Fragment>
                <defs>
                  <DotPattern patternId={canvasId} />
                </defs>
                <Background
                  patternId={canvasId}
                  height={getMaxHeight(props.nodes, dimensions.height)}
                  width={dimensions.width}
                />
                {props.edges.map((edge) => (
                  <DataEdge
                    key={edge.id}
                    onClick={() => props.onDeleteEdge(edge)}
                    fromNode={getNode(props.nodes, edge.from_node_id)}
                    toNode={getNode(props.nodes, edge.to_node_id)}
                  />
                ))}
                {props.nodes.map((node) => {
                  const NodeComponent = getComponentByType(node.type);
                  return (
                    <NodeComponent
                      canConnect={!!edgeInProgressState.fromNodeId}
                      hasToEdges={node.to_edge_ids.length > 0}
                      id={node.id}
                      key={node.id}
                      name={node.name}
                      onClickFromConnector={(event) =>
                        onStartEdgeInProgress(node.id, event)
                      }
                      onClickToConnector={() => {
                        if (edgeInProgressState.fromNodeId) {
                          props.onAddEdge(
                            edgeInProgressState.fromNodeId,
                            node.id
                          );
                        }
                        onStopEdgeInProgress();
                      }}
                      onMouseDown={(event) => props.onStartDrag(node.id, event)}
                      onMouseUp={props.onStopDrag}
                      x={node.x}
                      y={node.y}
                    >
                      {null}
                    </NodeComponent>
                  );
                })}
                {getEdgeInProgress(
                  props.nodes,
                  edgeInProgressState.fromNodeId,
                  edgeInProgressState.toCoordinates
                )}
              </React.Fragment>
            )}
          </Canvas>
        </div>
      </React.Fragment>
    </div>
  );
};

function getEdgeInProgress(
  nodes: Node[],
  fromNodeId: number | null,
  toCoordinates: Coordinates | null
) {
  if (fromNodeId === null || toCoordinates === null) return null;
  return (
    <DataEdgeInProgress
      fromNode={getNode(nodes, fromNodeId)}
      toCoordinates={toCoordinates}
    />
  );
}

function getNodeMaxBottom(nodes: Node[]): number {
  if (nodes.length === 0) return 0;
  const maxY = Math.max(...nodes.map((node) => node.y));
  return maxY + connectGraphNodeHeight + 16; // TODO gutter
}

function getMaxHeight(nodes: Node[], domHeight: number): number {
  return Math.max(domHeight, getNodeMaxBottom(nodes));
}

export default DataGraph;
