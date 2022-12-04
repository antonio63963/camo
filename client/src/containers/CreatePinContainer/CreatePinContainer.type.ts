type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};
type CreatePinProps = {
  user: User;
};

export type { 
  User,
  CreatePinProps,
};