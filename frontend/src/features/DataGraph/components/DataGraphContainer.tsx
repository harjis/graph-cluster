import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import DataGraph from './DataGraph/DataGraph';

type Params = {
  id: string;
};
export const DataGraphContainer = (props: RouteComponentProps<Params>) => {
  return <DataGraph graphId={Number(props.match.params.id)} />;
};
