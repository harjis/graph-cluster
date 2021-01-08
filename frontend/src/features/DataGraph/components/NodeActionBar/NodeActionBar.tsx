import React from 'react';

import { createNode, Node } from '../../../../api/nodes';
import { currentGraphIdQuery } from '../../atoms/graph';
import { Errors } from '../../../../types';
import { nodesState } from '../../atoms/nodes';
import { useRecoilCallback } from 'recoil';

import styles from './NodeActionBar.module.css';

const onUndo = () => {};
type Props = {
  isSaving: boolean;
  validationErrors: Errors;
};
export const NodeActionBar = (props: Props) => {
  const addNode = useRecoilCallback(
    ({ set, snapshot }) => async (nodeType: Node['type']) => {
      const currentGraphId = await snapshot.getPromise(currentGraphIdQuery);
      const newInputNode = await createNode(currentGraphId, nodeType);
      const prevNodes = await snapshot.getPromise(nodesState);
      set(nodesState, prevNodes.concat(newInputNode));
    },
    []
  );
  const addInputNode = React.useCallback(() => {
    addNode('InputNode');
  }, [addNode]);
  const addOutputNode = React.useCallback(() => {
    addNode('OutputNode');
  }, [addNode]);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <button onClick={addInputNode}>Add Input Node</button>
        <button onClick={addOutputNode}>Add Output Node</button>
        <button onClick={onUndo}>Undo</button>
        <div style={{ color: 'red' }}>
          {Object.values(props.validationErrors).join(' ')}
        </div>
        {props.isSaving && 'Saving...'}
      </div>
    </div>
  );
};
