import React from 'react';

import { Errors } from '../../constants/types';

import styles from './NodeActionBar.module.css';

type Props = {
  isSaving: boolean;
  onAddInputNode: () => any;
  onAddOutputNode: () => any;
  onUndo: () => any;
  onResetDb: () => any;
  validationErrors: Errors;
};
const NodeActionBar = (props: Props) => (
  <div className={styles.container}>
    <div className={styles.leftContainer}>
      <button onClick={props.onAddInputNode}>Add Input Node</button>
      <button onClick={props.onAddOutputNode}>Add Output Node</button>
      <button onClick={props.onUndo}>Undo</button>
      <div style={{ color: 'red' }}>
        {Object.values(props.validationErrors).join(' ')}
      </div>
      {props.isSaving && 'Saving...'}
    </div>
    <div>
      <button onClick={props.onResetDb}>Reset DB</button>
    </div>
  </div>
);

export default React.memo<Props>(NodeActionBar);
