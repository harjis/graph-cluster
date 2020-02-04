// @flow
import type { Tenant } from "../types/tenant";

export const url = `${window.location.origin}/api`;
export const options = {};

export function fetchTenants(): Promise<Tenant[]> {
  return fetch(`${url}/tenants`, options).then(response => response.json());
}

export function setTenant(tenantId: number): Promise<Tenant> {
  return fetch(`${url}/tenants/current`, {
    ...options,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tenant_id: tenantId })
  }).then(response => response.json());
}

export function fetchCurrentTenant() {
  return fetch(`${url}/tenants/current`, options).then(response => response.json());
}
