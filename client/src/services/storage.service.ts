const TOKENS = "tokens";
const USER_INFO = "userInfo";

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type UserInfo = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

class JwtService {
  getTokens() {
    const tokens = window.localStorage.getItem(TOKENS);
    return tokens ? JSON.parse(tokens) : null;
  }

  saveTokens(tokens: Tokens) {
    window.localStorage.setItem(TOKENS, JSON.stringify(tokens));
  }

  destroyTokens() {
    window.localStorage.removeItem(TOKENS);
  }

  // UserInfo

  getUserInfo() {
    const userInfo = window.localStorage.getItem(USER_INFO);
    return userInfo ? JSON.parse(userInfo) : null;
  }

  saveUserInfo(userInfo: UserInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    // localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
    console.log(this.getUserInfo());
  }

  clearStorage() {
    window.localStorage.clear();
  }
}

export default new JwtService();
