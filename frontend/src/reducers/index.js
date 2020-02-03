// @flow
import { combineReducers } from "redux";
import type { Tenant } from "../types/tenant";
import type { Action } from "../actions/currentTenantActions";

type CurrentTenantState = {|
  currentTenant: ?Tenant
|};
const initialState: CurrentTenantState = {};
const currentTenantReducer = (
  state: CurrentTenantState = initialState,
  action: Action
): CurrentTenantState => {
  switch (action.type) {
    case "CURRENT_TENANT/FETCH_SUCCESS":
      return {
        ...state,
        currentTenant: action.tenant
      };
    default:
      return state;
  }
};

export type ReduxState = {|
  currentTenantReducer: CurrentTenantState
|};
const rootReducer = combineReducers({
  currentTenantReducer
});

export default rootReducer;
