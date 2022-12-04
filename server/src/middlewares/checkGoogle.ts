import { Request, Response, NextFunction } from "express";
import ApiError from "lib/ApiError";
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.CLIENT_ID);

async function verify(token: string, clientId: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  const { name, email, picture, sub: googleId } = payload;
  return {name, email, picture, googleId};
};

const checkGoogle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.token;
    const userData = await verify(token, process.env.CLIENT_ID);
    if(userData) {
      res.locals.auth = userData;
    } else {
      throw ApiError.GoogleauthorizedError();
    }
    next();
  } catch (err) {
    throw ApiError.UnauthorizedError();
  }
};

export default checkGoogle;
