import { Request, Response, NextFunction } from "express";
import tokenService from "services/token.service";

import ApiError from "lib/ApiError";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  console.log('CheckAuth params: ', req.originalUrl, 'method: ', req.method)
  try {
    const rawTokens = req.headers.authorization?.split(" ")[1];
    const { accessToken, refreshToken } = JSON.parse(rawTokens);
    // console.log("accessToken: ", accessToken);

    if (accessToken) {
      // res.locals.auth = await tokenService.verifyAccessToken(accessToken);
      const decodedAccessToken = await tokenService.verifyToken(accessToken);
      console.log("TEST: ", decodedAccessToken);
      if (!decodedAccessToken) {
        const isValid = await tokenService.checkRefreshToken(refreshToken);
        console.log("IsValid: ", isValid);
        if (isValid) {
          const newAccessToken = await tokenService.createAccessToken({
            uid: isValid.uid,
          });
          res.locals.auth = {uid: isValid.uid};
          next();
        } else {
          throw ApiError.UnauthorizedError();
        }
      } else {
        res.locals.auth = decodedAccessToken;
        console.log("RES LOC: ", res.locals.auth);
        next();
      }
    } else {
      throw ApiError.UnauthorizedError();
    }
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
