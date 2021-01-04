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
    <div data-canvas-container className={styles.container}>
      <NodeActionBar
        addNode={addNode}
        isSaving={false}
        validationErrors={validationErrors}
      />
      {graph.name}

      <div className={styles.canvasContainer} ref={containerRef}>
        <DataCanvas
          ref={canvasRef}
          containerHeight={dimensions.height}
          containerWidth={dimensions.width}
        >
          {({ canvasId }) => (
            <>
              <DataBackground
                containerHeight={dimensions.height}
                containerWidth={dimensions.width}
                patternId={canvasId}
              />
              {edgeIds.map((edgeId) => (
                <DataEdge key={edgeId} edgeId={edgeId} />
              ))}
              {nodeIds.map((nodeId) => (
                <DataNode canvasRef={canvasRef} key={nodeId} nodeId={nodeId} />
              ))}
              <DataEdgeInProgress canvasRef={canvasRef} />
            </>
          )}
        </DataCanvas>
      </div>
    </div>
  );
};
