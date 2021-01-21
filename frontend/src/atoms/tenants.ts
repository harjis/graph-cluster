import { atom, selector } from 'recoil';
import { fetchCurrentTenant, fetchTenants } from '../api/tenants';

export const tenantsState = atom({
  key: 'tenantsState',
  default: selector({
    key: 'tenantsState/default',
    get: () => {
      return fetchTenants();
    },
  }),
});

export const currentTenantState = atom({
  key: 'currentTenantState',
  default: selector({
    key: 'currentTenantState/default',
    get: () => {
      return fetchCurrentTenant();
    },
  }),
});
