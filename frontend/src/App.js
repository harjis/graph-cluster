// @flow
import * as React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Home from 'Home/Home';
import GraphsMenu from 'ConnectGraph/components/GraphsMenu/GraphsMenu';
import TenantMenu from 'Generic/components/TenantMenu/TenantMenu';
import ConnectGraphContainer from 'ConnectGraph/ConnectGraphContainer';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            Tenants
            <TenantMenu />
          </li>
          <li>
            Graphs
            <GraphsMenu />
          </li>
        </ul>
      </div>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/graphs/:id" component={ConnectGraphContainer} />
    </Router>
  );
}
