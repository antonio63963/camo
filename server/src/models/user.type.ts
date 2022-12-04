type User = {
  [index: string]: any;
  email: string;
  password?: string;
  name: string;
  picture?: string;
  googleId?: string;
};

export type { User };