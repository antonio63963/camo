import UserModel from "models/user";
import bcrypt from "bcrypt";

import tokenService from "services/token.service";
import ApiError from "lib/ApiError";

type User = {
  [index: string]: any;
  email: string;
  password?: string;
  name: string;
  picture?: string;
  googleId?: string;
};

class UserService {
  async createUser(userData: User) {
    const user = new UserModel();
    Object.keys(userData).forEach((key: string) => (user[key] = userData[key]));
    const { id, name, email, picture } = await user.save();
    console.log("New user was created:", id);
    return { id, name, email, picture };
  }

  async googleAuth(userData: User): Promise<User> {
    const { email, googleId } = userData;
    const candidate = await UserModel.findOne(
      { email, googleId },
      { id: true, name: true, email: true, picture: true }
    );
    if (candidate && candidate.isBanned) {
      throw ApiError.ForbiddenError();
    }
    if (candidate && !candidate.isBanned) {
      console.log("GOOO: ", candidate);
      return candidate;
    }
    return await this.createUser(userData);
  }

  async registration(email: string, password: string, name: string) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequestError(
        `User with a such email ${email} already exists!`
      );
    } else {
      const hashPassword = await bcrypt.hash(password, 3);
      const user = await UserModel.create({ email, password: hashPassword, name });
      return user;
    }
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.UnauthorizedError();
    }
  }
}

export default new UserService();
