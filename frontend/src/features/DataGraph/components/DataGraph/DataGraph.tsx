import React from 'react';

import DataEdge from '../DataEdge/DataEdge';
import DataEdgeInProgress from '../DataEdge/DataEdgeInProgress';
import NodeActionBar from '../NodeActionBar/NodeActionBar';
import { Background, Canvas, DotPattern } from '../../../../components/Graph';
import { connectGraphNodeHeight } from '../../constants/constants';
import { getComponentByType } from '../../utils/nodeComponentUtil';
import { getNode } from '../../utils/nodeUtils';
import {
  useDataEdgeInProgress,
  Coordinates,
} from '../../hooks/useDataEdgeInProgress';
import useResizeObserver from '../../../../hooks/useResizeObserver';
import { Node } from '../../../../api/nodes';

import styles from './DataGraph.module.css';
import { useRecoilValue } from 'recoil';
import { graphQuery } from '../../selectors/graph';
import { ParentNode } from '../DataNodes';

const onAddInputNode = () => {};
const onAddOutputNode = () => {};
const onUndo = () => {};
const onResetDb = () => {};
const onAddEdge = (id: number, id2: number) => {};
const onStartDrag = (id: number, event: React.MouseEvent) => {};
const onStopDrag = () => {};
const validationErrors = {};
const nodes: Node[] = [];
type Props = {
  graphId: number;
};
const DataGraph: React.FC<Props> = (props) => {
  const graph = useRecoilValue(graphQuery(props.graphId));
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
          isSaving={false}
          onAddInputNode={onAddInputNode}
          onAddOutputNode={onAddOutputNode}
          onUndo={onUndo}
          onResetDb={onResetDb}
          validationErrors={validationErrors}
        />
        {/*.container + .innerContainer is a bit of a hack. Try to make it better*/}
        <div
          ref={containerRef}
          data-canvas-container
          className={styles.innerContainer}
        >
          <Canvas
            ref={ref}
            height={getMaxHeight(nodes, dimensions.height)}
            width={dimensions.width}
          >
            {({ canvasId }) => (
              <React.Fragment>
                <defs>
                  <DotPattern patternId={canvasId} />
                </defs>
                <Background
                  patternId={canvasId}
                  height={getMaxHeight(nodes, dimensions.height)}
                  width={dimensions.width}
                />
                {/*{props.edges.map((edge) => (*/}
                {/*  <DataEdge*/}
                {/*    key={edge.id}*/}
                {/*    onClick={() => props.onDeleteEdge(edge)}*/}
                {/*    fromNode={getNode(props.nodes, edge.from_node_id)}*/}
                {/*    toNode={getNode(props.nodes, edge.to_node_id)}*/}
                {/*  />*/}
                {/*))}*/}
                {graph.nodeIds.map((nodeId) => (
                  <ParentNode
                    id={nodeId}
                    graphId={props.graphId}
                    key={nodeId}
                  />
                ))}
                {getEdgeInProgress(
                  nodes,
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
