// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

import FetchData from 'Generic/components/FetchData';
import { fetchTenants, setTenant } from 'api/tenants';

const Tenants = () => {
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
            <ul>
              {tenants.map(tenant => (
                <li key={tenant.id}>
                  <Link to="/" onClick={async () => {
                    await setTenant(tenant.id);
                    // setCurrentTenant(tenant.id);
                  }}>
                    {tenant.name}
                  </Link>
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
