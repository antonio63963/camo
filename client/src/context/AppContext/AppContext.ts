import { createContext } from 'react';

import { TAppContext } from './AppContext.type';

const authContext = createContext<TAppContext>({
  avatar: '',
  setAvatar: () => {},
  isAvatar: false,
  setIsAvatar: () => {},
  isModal: false,
  setModal: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
});

export default authContext;
