import { createContext } from 'react';

import { TAppContext } from './AppContext.type';

const authContext = createContext<TAppContext>({
  isModal: false,
  setModal: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
});

export default authContext;
