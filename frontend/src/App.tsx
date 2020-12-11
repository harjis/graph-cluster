import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Graphs from './features/Graphs/Graphs';
import Tenants from './features/Tenants/Tenants';
import ConnectGraphContainer from './features/ConnectGraph/ConnectGraphContainer';
import { ReduxState } from './reducers';
import { Tenant } from './types/tenant';
import { startFetchCurrentTenant } from './actions/currentTenantActions';

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
      <Route exact path="/" component={Graphs} />
      <Route exact path="/tenants" component={Tenants} />
      <Route path="/graphs/:id" component={ConnectGraphContainer} />
    </Router>
  );
}

function mapStateToProps(state: ReduxState) {
  const currentTenantState = state.currentTenantReducer;
  return { currentTenant: currentTenantState.currentTenant };
}

export default connect(mapStateToProps)(App);
