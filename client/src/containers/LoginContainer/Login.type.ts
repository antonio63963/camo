type UserData = {
  name: string;
    password: string;
    repeatPassword: string;
    email: string;
    imageAsset: File | null;
};

type LoginProps = {
  onLogin: (data: {email: string, password: string}) => void;
  onSignUp: (data: FormData) => void;
};

export type {
  UserData,
  LoginProps,
};
