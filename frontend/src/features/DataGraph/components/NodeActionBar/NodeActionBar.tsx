import React from 'react';

import { Errors } from '../../../../types';
import { Node } from '../../../../api/nodes';

import styles from './NodeActionBar.module.css';

const onUndo = () => {};
const onResetDb = () => {};
type Props = {
  addNode: (nodeType: Node['type']) => void;
  isSaving: boolean;
  validationErrors: Errors;
};
export const NodeActionBar = (props: Props) => {
  const { addNode } = props;
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
      <div>
        <button onClick={onResetDb}>Reset DB</button>
      </div>
    </div>
  );
};
