// @flow
import * as React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Graphs from "./Graphs/Graphs";
import Tenants from 'Tenants/Tenants';
import ConnectGraphContainer from 'ConnectGraph/ConnectGraphContainer';
import { useFetch } from "./Generic/components/useFetch";
import type { Tenant } from "./types/tenant";

export default function App() {
  const [currentTenantBackend] = useFetch<Tenant>(`${window.location.origin}/api/tenants/current`);
  console.log('umm');
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tenants">Tenants</Link>: {currentTenantBackend && currentTenantBackend.name}
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
