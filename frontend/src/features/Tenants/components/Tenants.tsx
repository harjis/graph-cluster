import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';

import { currentTenantState, tenantsState } from '../../../atoms/tenants';

export const Tenants = () => {
  const loadableTenants = useRecoilValueLoadable(tenantsState);
  const [, setCurrentTenant] = useRecoilState(currentTenantState);

  if (
    loadableTenants.state === 'hasError' ||
    loadableTenants.state === 'loading'
  )
    return null;
  return (
    <div>
      <ul>
        {loadableTenants.contents.map((tenant) => (
          <li key={tenant.id}>
            <Link
              to="/"
              onClick={() => {
                setCurrentTenant(tenant);
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
