import React from 'react';
import { useRecoilValue } from 'recoil';

import DataEdge from '../DataEdge/DataEdge';
import DataEdgeInProgress from '../DataEdge/DataEdgeInProgress';
import NodeActionBar from '../NodeActionBar/NodeActionBar';
import useResizeObserver from '../../../../hooks/useResizeObserver';
import { Background, Canvas, DotPattern } from '../../../../components/Graph';
import { connectGraphNodeHeight } from '../../constants/constants';
import { DataNode } from '../DataNodes';
import { graphState } from '../../atoms/graph';
import { Node } from '../../../../api/nodes';
import { nodeIdsQuery } from '../../atoms/nodes';

import styles from './DataGraph.module.css';
import { edgeIdsQuery } from '../../atoms/edges';

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
  const edgeIds = useRecoilValue(edgeIdsQuery);
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

          <Canvas
            ref={canvasRef}
            height={getMaxHeight(nodes, dimensions.height)}
            width={dimensions.width}
          >
            {({ canvasId }) => (
              <React.Fragment>
                <Background
                  patternId={canvasId}
                  patternComponent={DotPattern}
                  height={getMaxHeight(nodes, dimensions.height)}
                  width={dimensions.width}
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
          </Canvas>
        </div>
      </React.Fragment>
    </div>
  );
};

function getNodeMaxBottom(nodes: Node[]): number {
  if (nodes.length === 0) return 0;
  const maxY = Math.max(...nodes.map((node) => node.y));
  return maxY + connectGraphNodeHeight + 16; // TODO gutter
}

function getMaxHeight(nodes: Node[], domHeight: number): number {
  return Math.max(domHeight, getNodeMaxBottom(nodes));
}
