
type Modal = {
  isModal: boolean;
  title: string;
  message: string;
}

type TAppContext = {
  isModal: boolean;
  setModal: (data: Modal) => void;
};

export type {
  TAppContext,
};
