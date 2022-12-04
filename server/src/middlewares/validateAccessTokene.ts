import { Request, Response, NextFunction } from 'express';
import tokenServis from "services/token.service";

const validateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken, refreshToken } = req.cookies;
  const checkedToken = await tokenServis.verifyToken(accessToken);
  console.log('VALIDATE ACCESS: ', checkedToken);
};

export default validateAccessToken;