import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import DataGraphContainer from './features/DataGraph';
import Tenants from './features/Tenants/Tenants';
import { GraphList } from './features/Graphs';
import { ReduxState } from './reducers';
import { startFetchCurrentTenant } from './actions/currentTenantActions';
import { Tenant } from './api/tenants';

type Props = {
  currentTenant: Tenant | null | undefined;
  dispatch: Function;
};

function App(props: Props) {
  const { dispatch } = props;
  React.useEffect(() => {
    dispatch(startFetchCurrentTenant());
  }, [dispatch]);
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tenants">Tenants</Link>:{' '}
            {props.currentTenant && props.currentTenant.name}
          </li>
        </ul>
      </div>
      <hr />
      <Route exact path="/" component={GraphList} />
      <Route exact path="/tenants" component={Tenants} />
      <Route path="/graphs/:id" component={DataGraphContainer} />
    </Router>
  );
}

function mapStateToProps(state: ReduxState) {
  const currentTenantState = state.currentTenantReducer;
  return { currentTenant: currentTenantState.currentTenant };
}

export default connect(mapStateToProps)(App);
