import jwt, { JwtPayload } from "jsonwebtoken";
import uniqid from "uniqid";

import TokenModel from "models/token";
import KeysService from "services/keys.service";
import ApiError from "lib/ApiError";

type JWT = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};

class TokenService {
  async createAccessToken(payload: { uid: string }) {
    try {
      const privKey = await KeysService.getPrivateKey();
      const token = jwt.sign(payload, privKey, {
        algorithm: "RS256",
        expiresIn: "5s",
      });
      return token;
    } catch (err) {
      console.log("JWT create failed...");
    }
  }

  async createRefreshToken(payload: { uid: string; email: string }) {
    const privKey = await KeysService.getPrivateKey();
    try {
      const refreshToken = jwt.sign(payload, privKey, {
        algorithm: "RS256",
        expiresIn: "48d",
      });
      return refreshToken;
    } catch (err) {
      console.log("ERROR: ", err);
    }
    return null;
  }

  async findToken(refreshToken: string) {
    const { token } = await TokenModel.findOne({ refreshToken: refreshToken });
    return token;
  }

  async generateTokens(uid: string, email: string) {
    const accessToken = await this.createAccessToken({
      uid,
    });
    const refreshToken = await this.createRefreshToken({
      uid,
      email,
    });
    const refreshTokenDoc = await this.saveTokenToDB(uid, refreshToken);
    if (refreshTokenDoc && accessToken) {
      return { accessToken, refreshToken };
    } else {
      console.log("Tokens were not built!");
      return null;
    }
  }

  async saveTokenToDB(userId: string, token: string) {
    return await TokenModel.create({ userId, token });
  }

  async verifyToken(token: string) {
    const pubKey = await KeysService.getPublicKey();
    try {
      return jwt.verify(token, pubKey) as { uid: string; email: string };
    } catch (err) {
      return null;
    }
  }

  async removeTokens(uid: string) {
    return await TokenModel.deleteMany({ uid }, { delete: true });
  }
}

export default new TokenService();
