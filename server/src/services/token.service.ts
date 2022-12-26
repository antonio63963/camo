import jwt, { JwtPayload } from "jsonwebtoken";

import TokenModel from "models/token";
import KeysService from "services/keys.service";
import ApiError from "lib/ApiError";

class TokenService {
  async createAccessToken(payload: { uid: string }) {
    const privKey = await KeysService.getPrivateKey();
    const token = jwt.sign(payload, privKey, {
      algorithm: "RS256",
      expiresIn: "48h",
    });
    return token;
  }

  async createRefreshToken(payload: { uid: string; email: string }) {
    const privKey = await KeysService.getPrivateKey();
    const refreshToken = jwt.sign(payload, privKey, {
      algorithm: "RS256",
      expiresIn: "48d",
    });
    return refreshToken;
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
      throw ApiError.ServerError();
    }
  }

  async saveTokenToDB(userId: string, token: string) {
    return await TokenModel.create({ userId, token });
  }

  async verifyToken(token: string) {
    const pubKey = await KeysService.getPublicKey();
    return jwt.verify(token, pubKey) as { uid: string; email: string };
  }

  async removeTokens(uid: string) {
    const tokenDoc = await TokenModel.deleteMany({ uid }, { delete: true });
    if (!tokenDoc) throw ApiError.ServerError();
    return tokenDoc;
  }
}

export default new TokenService();
