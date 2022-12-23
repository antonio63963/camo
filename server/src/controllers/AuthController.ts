import { Request, Response, NextFunction } from "express";
import userService from "services/auth.service";
import tokenService from "services/token.service";

class AuthController {
  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.auth;
      const userInfo = await userService.googleAuth(user);
      if (userInfo) {
        const tokens = await tokenService.getTokens(userInfo.id, userInfo.email);
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
      console.log("sigIn: ", req.body)
    } catch (err) {
      next(err);
    }
  }

  async singnUp(req: Request, res: Response, next: NextFunction) {
    console.log("sigUp: ", req.body)
    try{
      const { email, password, name } = req.body;
      const userDoc = await userService.registration(email, password, name);
      if(userDoc) {
        const { id, email, name } = userDoc;
        const tokens = await tokenService.getTokens(id, email);
        if(tokens) {
          res.json({
            status: 'ok',
            userInfo: { id, name, email, picture: null },
            tokens,
          })
        }
      }
    }catch(err){
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
