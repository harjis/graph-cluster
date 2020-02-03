// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';

import FetchData from 'Generic/components/FetchData';
import type { Tenant } from "../types/tenant";
import { fetchTenants, setTenant } from 'api/tenants';
import { useFetch } from "Generic/components/useFetch";

const Tenants = () => {
  const [currentTenant, setCurrentTenant] = React.useState(null);
  const [currentTenantBackend] = useFetch<Tenant>(`${window.location.origin}/api/tenants/current`);
  if (currentTenant !== null && currentTenant !== currentTenantBackend) {
    return <Redirect to="/" />;
  }

  return (
    <FetchData fetchOnlyOnMount query={fetchTenants}>
      {({ data: tenants, error, isLoading }) => {
        if (isLoading) {
          return 'Loading...';
        }
        if (error) {
          return <div>{error}</div>;
        }
        if (!tenants) {
          return <div>Something went wrong :(</div>;
        }
        return (
          <div>
            {currentTenantBackend && `Currently selected: ${currentTenantBackend.name}`}
            <ul>
              {tenants.map(tenant => (
                <li key={tenant.id}>
                  <a target="_blank" onClick={async () => {
                    await setTenant(tenant.id);
                    setCurrentTenant(tenant.id);
                  }}>
                    {tenant.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        );
      }}
    </FetchData>
  );
};

export default Tenants;
