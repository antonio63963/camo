import { Request, Response, NextFunction } from "express";
import userService from "services/auth.service";
import tokenService from "services/token.service";

const users = [
  {
    id: "1",
    name: "name",
    email: "test1@test.com",
    password: 123,
    isTeacher: true,
    jwt: "teacher",
  },
  {
    id: "2",
    name: "name",
    email: "test@test.com",
    password: 234,
    isTeacher: false,
    jwt: "token",
  },
];

class AuthController {
  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.auth;
      const userInfo = await userService.googleAuth(user);
      if (userInfo) {
        const accessToken = await tokenService.createAccessToken({
          uid: userInfo.id,
        });
        const refreshToken = await tokenService.createRefreshToken({
          uid: userInfo.id,
          email: userInfo.email,
        });
        const refreshTokenDoc = await tokenService.saveTokenToDB(
          userInfo.id,
          refreshToken
          );
        if (accessToken && refreshTokenDoc) {
          res.json({
            status: "ok",
            userInfo,
            tokens: { accessToken, refreshToken },
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }
  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      // const userData = await userService.login(email, password);
      const result = users.find((user) => user.email === email);
      const userData = { token: result.jwt, userId: result.id };
      if (userData) {
        res.json(userData);
      }
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // const isTokenRemoved = await tokenService.removeToken(req.body.token);
      // if(isTokenRemoved) {
      res.json(req.body.token);
      // };
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
