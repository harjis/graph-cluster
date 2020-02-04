// @flow
import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import FetchData from "Generic/components/FetchData";
import { fetchTenants } from "api/tenants";
import { setCurrentTenant } from "../actions/currentTenantActions";

type Props = {|
  dispatch: Function
|};
const Tenants = (props: Props) => {
  return (
    <FetchData fetchOnlyOnMount query={fetchTenants}>
      {({ data: tenants, error, isLoading }) => {
        if (isLoading) {
          return "Loading...";
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
      }}
    </FetchData>
  );
};

export default connect()(Tenants);
