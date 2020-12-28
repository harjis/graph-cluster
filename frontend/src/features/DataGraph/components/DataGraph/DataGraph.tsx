import React from 'react';
import { useRecoilValue } from 'recoil';

import DataEdge from '../DataEdge/DataEdge';
import DataEdgeInProgress from '../DataEdge/DataEdgeInProgress';
import NodeActionBar from '../NodeActionBar/NodeActionBar';
import useResizeObserver from '../../../../hooks/useResizeObserver';
import { Background, Canvas, DotPattern } from '../../../../components/Graph';
import { connectGraphNodeHeight } from '../../constants/constants';
import { DataNode } from '../DataNodes';
import { getNode } from '../../utils/nodeUtils';
import { graphState } from '../../atoms/graph';
import { Node } from '../../../../api/nodes';
import { nodeIdsQuery } from '../../atoms/nodes';
import {
  useDataEdgeInProgress,
  Coordinates,
} from '../../hooks/useDataEdgeInProgress';

import styles from './DataGraph.module.css';

const onAddInputNode = () => {};
const onAddOutputNode = () => {};
const onUndo = () => {};
const onResetDb = () => {};
const onAddEdge = (id: number, id2: number) => {};
const onStartDrag = (id: number, event: React.MouseEvent) => {};
const onStopDrag = () => {};
const validationErrors = {};
const nodes: Node[] = [];
type Props = {};
export const DataGraph: React.FC<Props> = (props) => {
  const graph = useRecoilValue(graphState);
  const nodeIds = useRecoilValue(nodeIdsQuery);
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
        {graph.name}
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
                {nodeIds.map((nodeId) => (
                  <DataNode
                    key={nodeId}
                    nodeId={nodeId}
                    onStartEdgeInProgress={onStartEdgeInProgress}
                    onStopEdgeInProgress={onStopEdgeInProgress}
                  />
                ))}
                {getEdgeInProgress(
                  edgeInProgressState.fromCoordinates,
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
  fromCoordinates: Coordinates | null,
  toCoordinates: Coordinates | null
) {
  if (fromCoordinates === null || toCoordinates === null) return null;
  return (
    <DataEdgeInProgress
      fromCoordinates={fromCoordinates}
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
