
type Modal = {
  isModal: boolean;
  title: string;
  message: string;
}

type TAppContext = {
  isAvatar: boolean;
  setIsAvatar: (data: boolean) => void;
  isModal: boolean;
  setModal: (data: Modal) => void;
  searchTerm: string;
  setSearchTerm: (data: string) => void;
};

export type {
  TAppContext,
};
