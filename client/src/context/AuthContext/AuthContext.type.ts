
type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type TAuthContext = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean, tokens?: Tokens) => void;
};

export type {
  TAuthContext,
};
