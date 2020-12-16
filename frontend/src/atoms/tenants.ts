import { atom } from 'recoil';
import { fetchCurrentTenant, fetchTenants } from '../api/tenants';

export const tenantsState = atom({
  key: 'tenantsState',
  default: fetchTenants(),
});

export const currentTenantState = atom({
  key: 'currentTenantState',
  default: fetchCurrentTenant(),
});
