import React, { Suspense } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import { DataGraphContainer } from './features/DataGraph';
import { currentTenantState } from './atoms/tenants';
import { GraphList } from './features/Graphs';
import { Loading } from './components/Loading';
import { Tenants } from './features/Tenants';

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Suspense fallback={<Loading />}>
          <AppWithCurrentTenant />
        </Suspense>
      </Router>
    </RecoilRoot>
  );
};

const AppWithCurrentTenant = () => {
  const currentTenant = useRecoilValue(currentTenantState);
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tenants">Tenants</Link>: {currentTenant.name}
          </li>
        </ul>
      </div>
      <hr />
      <Route exact path="/" component={GraphList} />
      <Route exact path="/tenants" component={Tenants} />
      <Route path="/graphs/:id" component={DataGraphContainer} />
    </>
  );
};

export default App;
