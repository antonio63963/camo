type AuthProps = {
  onGoogleSuccess: (data: string) => void;
  onLoginFailed: () => void;
  onLogin: (data: {email: string, password: string}) => void;
  onSignUp: (data: FormData) => void;
};

type UserInfo = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

type ServerResponse = {
  status: string;
  userInfo: UserInfo;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

type UserData = {
  name: string;
  password: string;
  repeatPassword: string;
  email: string;
  imageAsset: File | null;
};


export type { AuthProps, ServerResponse, UserData };
