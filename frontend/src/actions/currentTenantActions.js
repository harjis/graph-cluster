// @flow
import type { Dispatch } from 'redux';
import type { Tenant } from '../types/tenant';
import { fetchCurrentTenant, setTenant } from '../api/tenants';

type FetchSuccess = {|
  type: 'CURRENT_TENANT/FETCH_SUCCESS',
  tenant: Tenant
|};
type SetTenant = {|
  type: 'CURRENT_TENANT/SET',
  tenant: Tenant
|};
export type Action = FetchSuccess | SetTenant;

export const startFetchCurrentTenant = () => (dispatch: Dispatch<Action>) => {
  return fetchCurrentTenant().then(tenant =>
    dispatch(fetchCurrentTenantSuccess(tenant))
  );
};

const fetchCurrentTenantSuccess = (tenant: Tenant): FetchSuccess => ({
  type: 'CURRENT_TENANT/FETCH_SUCCESS',
  tenant
});

const setCurrentTenantSuccess = (tenant: Tenant): SetTenant => ({
  type: 'CURRENT_TENANT/SET',
  tenant
});

export const setCurrentTenant = (tenantId: number) => (
  dispatch: Dispatch<Action>
) => {
  return setTenant(tenantId).then(tenant =>
    dispatch(setCurrentTenantSuccess(tenant))
  );
};
