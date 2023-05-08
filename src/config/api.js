import { create as apisauceCreate } from 'apisauce';

import { API_TIMEOUT, API_BASE_URL } from './constants';

const api = apisauceCreate({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT
});

export default api;
