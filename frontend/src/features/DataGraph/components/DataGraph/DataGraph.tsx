import React from 'react';
import { SizeMe } from 'react-sizeme';

import DataEdge from '../DataEdge/DataEdge';
import DataEdgeInProgress from '../DataEdge/DataEdgeInProgress';
import NodeActionBar from '../NodeActionBar/NodeActionBar';
import { Background, Canvas, DotPattern } from '../../../../components/Graph';
import { connectGraphNodeHeight } from '../../constants/constants';
import { CTM } from '../../../../utils/svg_utils';
import { Edge, Errors, Node } from '../../constants/types';
import { getComponentByType } from '../../utils/nodeComponentUtil';
import { getMousePosition } from '../../../../utils/svg_utils';
import { getNode } from '../../utils/nodeUtils';
import { useDataEdgeInProgress } from '../../hooks/useDataEdgeInProgress';

import styles from './DataGraph.module.css';

type Props = {
  edges: Edge[];
  nodes: Node[];
  isSaving: boolean;
  onAddEdge: (fromNodeId: number, toNodeId: number) => any;
  onAddInputNode: () => any;
  onAddOutputNode: () => any;
  onDeleteEdge: (edge: Edge) => any;
  onStartDrag: (nodeId: number, event: React.MouseEvent<Element>) => any;
  onStopDrag: (event: React.MouseEvent<Element>) => any;
  onUndo: () => any;
  onResetDb: () => any;
  validationErrors: Errors;
};
const DataGraph = (props: Props) => {
  const {
    edgeInProgressState,
    onStartEdgeInProgress,
    onStopEdgeInProgress,
  } = useDataEdgeInProgress();
  const canvasRef = React.useRef<SVGSVGElement>(null);
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
        <div data-canvas-container className={styles.innerContainer}>
          <SizeMe monitorHeight>
            {({ size }) => (
              <Canvas
                ref={canvasRef}
                height={getMaxHeight(props.nodes, size.height || 0)}
                width={size.width || 0}
              >
                {({ canvasId }) => (
                  <React.Fragment>
                    <defs>
                      <DotPattern patternId={canvasId} />
                    </defs>
                    <Background
                      patternId={canvasId}
                      height={getMaxHeight(props.nodes, size.height || 0)}
                      width={size.width || 0}
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
                            onStartEdgeInProgress(node.id, event, canvasRef)
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
                          onMouseDown={(event) =>
                            props.onStartDrag(node.id, event)
                          }
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
                      edgeInProgressState.clientX,
                      edgeInProgressState.clientY,
                      edgeInProgressState.ctm
                    )}
                  </React.Fragment>
                )}
              </Canvas>
            )}
          </SizeMe>
        </div>
      </React.Fragment>
    </div>
  );
};

function getEdgeInProgress(
  nodes: Node[],
  fromNodeId: number | null | undefined,
  clientX: number,
  clientY: number,
  ctm: CTM | null | undefined
) {
  if (fromNodeId === null || fromNodeId === undefined || !ctm) return null;
  const toCoordinates = getMousePosition(clientX, clientY, ctm);
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
