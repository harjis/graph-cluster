import React from 'react';

import DataEdge from '../DataEdge/DataEdge';
import DataEdgeInProgress from '../DataEdge/DataEdgeInProgress';
import NodeActionBar from '../NodeActionBar/NodeActionBar';
import useResizeObserver from '../../../../hooks/useResizeObserver';
import { DataBackground } from '../DataBackground/DataBackground';
import { DataCanvas } from '../DataCanvas/DataCanvas';
import { DataNode } from '../DataNodes';
import { Node } from '../../../../api/nodes';
import { useGraph } from '../../hooks/useGraph';

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
  const { graph, nodeIds, edgeIds } = useGraph();
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const canvasRef = React.useRef<SVGSVGElement>(null);
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
          <DataCanvas
            ref={canvasRef}
            containerHeight={dimensions.height}
            containerWidth={dimensions.width}
          >
            {({ canvasId }) => (
              <React.Fragment>
                <DataBackground
                  containerHeight={dimensions.height}
                  containerWidth={dimensions.width}
                  patternId={canvasId}
                />
                {edgeIds.map((edgeId) => (
                  <DataEdge key={edgeId} edgeId={edgeId} />
                ))}
                {nodeIds.map((nodeId) => (
                  <DataNode
                    canvasRef={canvasRef}
                    key={nodeId}
                    nodeId={nodeId}
                  />
                ))}
                <DataEdgeInProgress canvasRef={canvasRef} />
              </React.Fragment>
            )}
          </DataCanvas>
        </div>
      </React.Fragment>
    </div>
  );
};
