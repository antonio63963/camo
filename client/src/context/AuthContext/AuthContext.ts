import { createContext } from 'react';

import { TAuthContext } from './AuthContext.type';

const authContext = createContext<TAuthContext>({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {
    console.log(isAuthenticated);
  },
});

export default authContext;
