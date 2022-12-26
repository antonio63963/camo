import { Request, Response, NextFunction } from "express";
import userService from "services/user.service";
import tokenService from "services/token.service";

class AuthController {
  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.auth;
      const userInfo = await userService.googleAuth(user);
      const tokens = await tokenService.generateTokens(
        userInfo.id,
        userInfo.email
      );
      res.json({
        status: "ok",
        userInfo,
        tokens,
      });
    } catch (err) {
      next(err);
    }
  }

  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const userDoc = await userService.login(
        req.body.email,
        req.body.password
      );
      const { id, email, name, avatar } = userDoc;
      const tokens = await tokenService.generateTokens(id, email);
      res.json({
        status: "ok",
        userInfo: { id, name, email, avatar },
        tokens,
      });
    } catch (err) {
      next(err);
    }
  }

  async singnUp(req: Request, res: Response, next: NextFunction) {
    try {
      const userDoc = await userService.signUp(
        req.body.email,
        req.body.password,
        req.body.name
      );
      const { id, email, name, avatar } = userDoc;

      const tokens = await tokenService.generateTokens(id, email);
      res.json({
        status: "ok",
        userInfo: { id, name, email, avatar },
        tokens,
      });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { uid } = res.locals.auth;
      await tokenService.removeTokens(uid);
      res.json({ status: "ok" });
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const tokens = await userService.refresh(refreshToken);
      res.json({ status: "ok", tokens });
    } catch (err) {
      next(err);
    }
  }

  async changeAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const avatar = await userService.setAvatar(
        res.locals.auth.uid,
        req.body.avatarPath.avatar
      );
      res.json({ avatar });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
