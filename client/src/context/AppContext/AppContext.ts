import { createContext } from 'react';

import { TAppContext } from './AppContext.type';

const authContext = createContext<TAppContext>({
  isModal: false,
  setModal: () => {},
});

export default authContext;
