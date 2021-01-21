import * as AuthStore from '../stores/AuthStore';

export const url = `${window.location.origin}/api`;

export const options = {
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${AuthStore.getAccessToken()}`,
  },
};
