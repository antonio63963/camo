import axios, { AxiosResponse, AxiosError } from 'axios';
import type { createBrowserHistory } from 'history';
import routes from '../routes';

import jwtService from './storage.service';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

class AxiosService {
  init(history: ReturnType<typeof createBrowserHistory>) {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
    axios.interceptors.response.use((response: AxiosResponse): AxiosResponse<any, any> => {
      if(response.data?.tokens) {
        this.setAuthorizationHeader(response.data.tokens);
      };
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        console.log('Axios: ', error.response.status, history.location.pathname)

        if (
          error.response.status === 401 &&
          history.location.pathname !== routes.AUTH_SIGNIN
        ) {
          jwtService.destroyTokens();
          this.setAuthorizationHeader();
          history.push(routes.AUTH_SIGNIN);
        }
        if (
          error.response.status === 404 &&
          error.response.config.method === 'get'
        ) {
          history.push(routes.NOT_FOUND);
        }
      }
      return Promise.reject(error);
    });

    this.setAuthorizationHeader(jwtService.getTokens());
  }

  setAuthorizationHeader(tokens?: Tokens | null) {
    if (tokens) {
      axios.defaults.headers.common.Authorization = `Bearer ${JSON.stringify(tokens)}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }
};

export default new AxiosService();
