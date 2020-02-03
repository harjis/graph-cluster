// @flow
import type { Tenant } from "../types/tenant";

type FetchSuccess = {|
  type: "CURRENT_TENANT/FETCH_SUCCESS",
  tenant: Tenant
|};
export type Action = FetchSuccess;

export const fetchCurrentTenant = () => dispatch => {
  return fetchCurrentTenant().then(tenant =>
    dispatch(fetchCurrentTenantSuccess(tenant))
  );
};

const fetchCurrentTenantSuccess = (tenant: Tenant): FetchSuccess => ({
  type: "CURRENT_TENANT/FETCH_SUCCESS",
  tenant
});
