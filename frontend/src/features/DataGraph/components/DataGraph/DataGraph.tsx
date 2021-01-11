import React, { Suspense } from 'react';

import DataEdgeInProgress from '../DataEdge/DataEdgeInProgress';
import useResizeObserver from '../../../../hooks/useResizeObserver';
import { DataBackground } from '../DataBackground/DataBackground';
import { DataCanvas } from '../DataCanvas/DataCanvas';
import { DataEdges } from '../DataEdge/DataEdges';
import { DataNodes } from '../DataNodes/DataNodes';
import { NodeActionBar } from '../NodeActionBar/NodeActionBar';
import { useGraph } from '../../hooks/useGraph';

import styles from './DataGraph.module.css';
import { Loading } from '../../../../components/Loading';

const validationErrors = {};

export const DataGraph: React.FC = () => {
  const { graph } = useGraph();
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();
  const canvasRef = React.useRef<SVGSVGElement>(null);

  return (
    <div data-canvas-container className={styles.container}>
      <NodeActionBar isSaving={false} validationErrors={validationErrors} />
      {graph.name}

      <div className={styles.canvasContainer} ref={containerRef}>
        <Suspense fallback={<Loading />}>
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

                <DataEdges />
                <DataNodes canvasRef={canvasRef} />

                <DataEdgeInProgress canvasRef={canvasRef} />
              </>
            )}
          </DataCanvas>
        </Suspense>
      </div>
    </div>
  );
};
