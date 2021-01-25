import React, { Suspense } from 'react';

import { useDynamicScript } from '../moduleFederation/useDynamicScript';
import { loadComponent } from '../moduleFederation/utils';
import * as AuthStore from '../stores/AuthStore';

export const url = `${window.location.origin}/folder_service_mf`;
const remote = {
  url: `${url}/remoteEntry.js`,
  scope: 'sub_app',
  module: './Folders',
};
type FoldersChildrenByFolderId = { [key: number]: React.ReactNode[] };
type Props = {
  foldersChildrenByFolderId: FoldersChildrenByFolderId;
};
export const RemoteFolders: React.FC<Props> = (props) => {
  const { ready, failed } = useDynamicScript({
    url: remote.url,
  });

  if (!ready) {
    return <h2>Loading dynamic script: {remote.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {remote.url}</h2>;
  }

  const Component = React.lazy(loadComponent(remote.scope, remote.module));

  return (
    <Suspense fallback={<div>loading remote box</div>}>
      <Component
        foldersChildrenByFolderId={props.foldersChildrenByFolderId}
        accessToken={AuthStore.getAccessToken()}
      />
    </Suspense>
  );
};
