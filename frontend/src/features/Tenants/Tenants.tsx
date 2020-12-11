import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchTenants } from '../../api/tenants';
import { setCurrentTenant } from '../../actions/currentTenantActions';
import { useFetch } from '../../hooks/useFetch';
import { LoadingState } from '../../types';

type Props = {
  dispatch: Function;
};
const Tenants = (props: Props) => {
  const { data: tenants, error, loadingState } = useFetch(fetchTenants, []);

  if (loadingState === LoadingState.LOADING) {
    return <div>Loading...</div>;
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
        {tenants.map((tenant) => (
          <li key={tenant.id}>
            <Link
              to="/"
              onClick={() => {
                props.dispatch(setCurrentTenant(tenant.id));
              }}
            >
              {tenant.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect()(Tenants);
