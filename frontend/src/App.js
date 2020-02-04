// @flow
import * as React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { connect } from "react-redux";

import Graphs from "./Graphs/Graphs";
import Tenants from "Tenants/Tenants";
import ConnectGraphContainer from "ConnectGraph/ConnectGraphContainer";
import type { ReduxState } from "./reducers";
import type { Tenant } from "./types/tenant";
import { startFetchCurrentTenant } from "./actions/currentTenantActions";

type Props = {|
  currentTenant: ?Tenant,
  dispatch: Function
|};

function App(props: Props) {
  const { dispatch } = props;
  React.useEffect(() => {
    console.log('fetch');
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
            <Link to="/tenants">Tenants</Link>:{" "}
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
