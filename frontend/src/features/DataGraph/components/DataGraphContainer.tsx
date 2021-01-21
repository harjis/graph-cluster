import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { DataGraph } from './DataGraph/DataGraph';
import { currentGraphIdState } from '../atoms/graph';
import { RemoteFolders } from '../../../remoteComponents/RemoteFolders';

const foldersChildrenByFolderId = {
  1: [<div>Folder 1 child 1</div>, <div>Folder 1 child 2</div>],
  2: [<div>Folder 2 child 1</div>],
};

type Params = {
  id: string;
};
export const DataGraphContainer = (props: RouteComponentProps<Params>) => {
  const id = props.match.params.id;
  const [currentGraphId, setCurrentGraphId] = useRecoilState(
    currentGraphIdState
  );

  // setCurrentGraphId needs to be inside an effect call
  // Otherwise -> Cannot update a component (`Batcher`)
  // while rendering a different component
  // https://github.com/facebookexperimental/Recoil/issues/12#issuecomment-732193801
  React.useEffect(() => {
    setCurrentGraphId(Number(id));
  }, [id, setCurrentGraphId]);

  if (currentGraphId === null) {
    return null;
  }
  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <div
        style={{ borderRight: '1px solid black', height: '100%', width: '400px' }}
      >
        <RemoteFolders foldersChildrenByFolderId={foldersChildrenByFolderId} />
      </div>
      <div style={{ height: '100%', width: '100%' }}>
        <DataGraph />
      </div>
    </div>
  );
};
