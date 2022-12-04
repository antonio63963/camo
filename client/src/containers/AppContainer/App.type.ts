import type { createBrowserHistory } from 'history';

type AppProps = {
  history: ReturnType<typeof createBrowserHistory>
};

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type UserInfo = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

export type { AppProps, Tokens, UserInfo, };
