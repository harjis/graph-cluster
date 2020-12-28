import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { DataGraph } from './DataGraph/DataGraph';
import { currentGraphIdState } from '../atoms/graph';

type Params = {
  id: string;
};
export const DataGraphContainer = (props: RouteComponentProps<Params>) => {
  const [currentGraphId, setCurrentGraphId] = useRecoilState(
    currentGraphIdState
  );
  setCurrentGraphId(Number(props.match.params.id));
  if (currentGraphId === null) {
    return null;
  }
  return <DataGraph />;
};
