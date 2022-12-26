import { Request, Response, NextFunction } from "express";
import tokenService from "services/token.service";

import ApiError from "lib/ApiError";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (accessToken) {
      const decodedAccessToken = await tokenService.verifyToken(accessToken);
      if(decodedAccessToken) {
        console.log("TEST: ", decodedAccessToken);
        res.locals.auth = decodedAccessToken;
        next()
      }else {
        next(ApiError.UnauthorizedError());
      }
    } else {
      next(ApiError.UnauthorizedError());
    }
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
