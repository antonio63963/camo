import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import type { createBrowserHistory } from "history";
import routes from "../routes";

import storageService from "./storage.service";

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type TConfig = {
  [index: string]: any;
};

class AxiosService {
  init(history: ReturnType<typeof createBrowserHistory>) {
    // axios.defaults.withCredentials = true;
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
    axios.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse<any, any> => {
        if (response.data?.tokens) {
          this.setAuthorizationHeader(response.data.tokens);
        }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as TConfig;
        console.log(originalRequest)
        if (error.response) {
          if (
            error.response.status === 401 &&
            !originalRequest._isRetry
            ) {
            try {
              originalRequest._isRetry = true;
              const { refreshToken } = storageService.getTokens();
              const { data: {status, tokens} } = await axios.post<{status: string, tokens: Tokens}>("/auth/refresh", {
                refreshToken,
              });
              console.log(status , tokens)
              storageService.saveTokens(tokens);
              this.setAuthorizationHeader(tokens);
              originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
              return await axios.request(originalRequest);
            } catch (err) {
              history.push(routes.AUTH_SIGNIN);
            }
          } else {
            storageService.destroyTokens();
            this.setAuthorizationHeader();
            history.push(routes.AUTH_SIGNIN);
          }

          if (
            error.response.status === 404
          ) {
            history.push(routes.NOT_FOUND);
          }
        }
        return Promise.reject(error);
      }
    );

    this.setAuthorizationHeader(storageService.getTokens());
  }

  setAuthorizationHeader(tokens?: Tokens | null) {
    if (tokens) {
      axios.defaults.headers.common.Authorization = `Bearer ${tokens.accessToken}`;
      console.log("HEADER: ", axios.defaults.headers.common.Authorization)
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }
}

export default new AxiosService();
