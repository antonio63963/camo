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
        expiresIn: "1m",
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

  // createRefreshToken() {
  //   console.log('refresh+++++')
  //   const uniq = uniqid();
  //   console.log('refresh____', uniq)
  //   return uniq;
  // }

  async checkRefreshToken(refreshToken: string) {
    const { token } = await TokenModel.findOne({ refreshToken: refreshToken });
    return token ? (this.verifyToken(token) as JwtPayload) : null;
  }

  // async updateTokens(uid: string, accessToken: string, refreshToken: string) {
  //   const newAccessToken = await this.createAccessToken({ uid });
  //   const newRefreshToken = this.createRefreshToken();

  //   const doc = await TokenModel.updateOne(
  //     { refreshToken },
  //     { refreshToken: newRefreshToken }
  //   );
  //   if (doc) {
  //     return {
  //       accessToken: newAccessToken,
  //       refreshToken: refreshToken,
  //     };
  //   }
  // }

  async saveTokenToDB(userId: string, token: string) {
    return await TokenModel.create({ userId, token });
  }

  async verifyToken(token: string) {
    const pubKey = await KeysService.getPublicKey();
    try {
      return jwt.verify(token, pubKey);
    } catch (err) {
      return null;
    }
  }

  async removeToken(token: string) {
    const removedToken = await TokenModel.deleteOne(
      { token },
      { delete: true }
    );
    if (!removedToken) {
      throw ApiError.ServerError();
    }
    return { isTokenRemoved: true };
  }
}

export default new TokenService();
