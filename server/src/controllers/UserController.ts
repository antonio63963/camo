import { NextFunction, Request, Response } from "express";
import userService from "services/user.service";
import ApiError from "lib/ApiError";

class UserController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async changeAvatar(req: Request, res: Response, next: NextFunction) {
    const { uid } = res.locals.auth;
    const avatar = req.body.avatarPath;

    try {
      const updatedDoc = await userService.setAvatar(uid, avatar);
      if(updatedDoc.avatar) {
        res.json({ avatar: updatedDoc.avatar });
      } else {
        throw ApiError.ServerError();
      }
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
