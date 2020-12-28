import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { DataGraph } from './DataGraph/DataGraph';
import { currentGraphIdState } from '../atoms/graph';

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
  return <DataGraph />;
};
