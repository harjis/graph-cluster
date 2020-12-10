import { combineReducers } from 'redux';
import { Tenant } from '../types/tenant';
import { Action } from '../actions/currentTenantActions';

type CurrentTenantState = {
  currentTenant: Tenant | null | undefined;
};
const initialState: CurrentTenantState = {
  currentTenant: null,
};
const currentTenantReducer = (
  state: CurrentTenantState = initialState,
  action: Action
): CurrentTenantState => {
  switch (action.type) {
    case 'CURRENT_TENANT/SET':
    case 'CURRENT_TENANT/FETCH_SUCCESS':
      return {
        ...state,
        currentTenant: action.tenant,
      };
    default:
      return state;
  }
};

export type ReduxState = {
  currentTenantReducer: CurrentTenantState;
};
const rootReducer = combineReducers({
  currentTenantReducer,
});

export default rootReducer;
