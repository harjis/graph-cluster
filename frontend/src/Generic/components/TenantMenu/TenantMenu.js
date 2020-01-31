// @flow
import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import FetchData from 'Generic/components/FetchData';
import { fetchTenants, setTenant } from 'api/tenants';
import { useFetch } from "../useFetch";

const TenantsMenu = () => {
  const [currentTenant, setCurrentTenant] = React.useState(null);
  const [currentTenantBackend] = useFetch(`${window.location.origin}/api/tenants/current`);
  if (currentTenant !== null && currentTenant !== currentTenantBackend) {
    return <Redirect to="/"/>;
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
          <ul>
            {tenants.map(tenant => (
              <li key={tenant.id}>
                <Link onClick={async () => {
                  await setTenant(tenant.id);
                  setCurrentTenant(tenant.id);
                }} to="/">{tenant.name}</Link>
              </li>
            ))}
          </ul>
        );
      }}
    </FetchData>
  );
};

export default TenantsMenu;
