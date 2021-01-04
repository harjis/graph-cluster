import React from 'react';

import DataEdge from '../DataEdge/DataEdge';
import DataEdgeInProgress from '../DataEdge/DataEdgeInProgress';
import useResizeObserver from '../../../../hooks/useResizeObserver';
import { DataBackground } from '../DataBackground/DataBackground';
import { DataCanvas } from '../DataCanvas/DataCanvas';
import { DataNode } from '../DataNodes';
import { NodeActionBar } from '../NodeActionBar/NodeActionBar';
import { useGraph } from '../../hooks/useGraph';

import styles from './DataGraph.module.css';

const validationErrors = {};

export const DataGraph: React.FC = () => {
  const { graph, nodeIds, edgeIds, addNode } = useGraph();
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const canvasRef = React.useRef<SVGSVGElement>(null);

  return (
    <div className={styles.container}>
      <React.Fragment>
        <NodeActionBar
          addNode={addNode}
          isSaving={false}
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
