import { Request, Response, NextFunction } from "express";
import userService from "services/user.service";
import tokenService from "services/token.service";
import ApiError from "lib/ApiError";

class AuthController {
  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.auth;
      const userInfo = await userService.googleAuth(user);
      if (userInfo) {
        const tokens = await tokenService.generateTokens(
          userInfo.id,
          userInfo.email
        );
        if (tokens) {
          res.json({
            status: "ok",
            userInfo,
            tokens,
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
      const userDoc = await userService.login(email, password);
      if (userDoc) {
        const { id, email, name, avatar } = userDoc;
        const tokens = await tokenService.generateTokens(id, email);
        if (tokens) {
          res.json({
            status: "ok",
            userInfo: { id, name, email, avatar },
            tokens,
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  async singnUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      const userDoc = await userService.registration(email, password, name);;
      if (userDoc) {
        const { id, email, name, avatar } = userDoc;
        const tokens = await tokenService.generateTokens(id, email);
        if (tokens) {
          res.json({
            status: "ok",
            userInfo: { id, name, email, avatar },
            tokens,
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { uid } = res.locals.auth;
      const tokenDoc = await tokenService.removeTokens(uid);
      if (tokenDoc) {
        res.json({ status: "ok" });
      } else {
        throw ApiError.ServerError();
      }
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    console.log("++++++Refreshing++++++")
    try {
      const {refreshToken} = req.body;
      const tokens = await userService.refresh(refreshToken);
      res.json({ status: "ok", tokens});
    } catch (err) {
      next(err)
    }
  }
}

export default new AuthController();
