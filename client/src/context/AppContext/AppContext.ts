import { createContext } from 'react';

import { TAppContext } from './AppContext.type';

const authContext = createContext<TAppContext>({
  isAvatar: false,
  setIsAvatar: () => {},
  isModal: false,
  setModal: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
});

export default authContext;
