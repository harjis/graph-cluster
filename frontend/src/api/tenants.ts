import { url, options } from './common';

export type Tenant = {
  id: number;
  name: string;
};

export function fetchTenants(): Promise<Tenant[]> {
  return fetch(`${url}/tenants`, options).then((response) => response.json());
}

export function setTenant(tenantId: number): Promise<Tenant> {
  return fetch(`${url}/tenants/current`, {
    ...options,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tenant_id: tenantId }),
  }).then((response) => response.json());
}

export function fetchCurrentTenant(): Promise<Tenant> {
  return fetch(`${url}/tenants/current`, options).then((response) =>
    response.json()
  );
}
