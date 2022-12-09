import { NextFunction, Request, Response } from "express";
import uniqid from "uniqid";

import ApiError from "lib/ApiError";
import pinService from "services/pin.service";

class PinController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const pins = await pinService.getPins();
      if (pins) {
        res.json({ status: "ok", pins });
      }
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { pin } = res.locals;
    try {
      const createdPin = await pinService.createPin(pin);
      res.json({
        pin: createdPin,
      });
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const pinId = req.params.id;
      const pinData = await pinService.getPinById(pinId);
      if (pinData) {
        res.json({ status: "ok", pinData });
      } else {
        throw ApiError.NotFound();
      }
    } catch (err) {
      console.log("ERRR SHOW: ", err);
      next(err);
    }
  }

  async addComment(req: Request, res: Response, next: NextFunction) {
    const pinId = req.params.id;
    const comment = req.body;
    try {
      const comments = await pinService.addNewComment({ ...comment, pinId });
      res.json({
        status: "ok",
        comments,
      });
    } catch (err) {
      console.log("ERRR ADD COMMENT: ", err);
      next(err);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = res.locals.auth;
      const updatedList = await pinService.editPin({
        userId,
        ...req.body,
      });
      if (updatedList) {
        res.json({
          list: updatedList,
        });
      } else {
        throw ApiError.ServerError();
      };
    } catch (err) {
      next(err);
    };
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { uid } = res.locals.auth;
    const pinId = req.params.id;
    try {
      const _id = await pinService.removePin(pinId, uid);
      if (_id) {
        res.json({
          status: 'ok',
        });
      } else {
        throw ApiError.ServerError();
      };
    } catch (err) {
      next(err);
    };
  }

  async samePins(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.params;
      const pins = await pinService.getSamePins(category);
      if (pins) {
        res.json({ status: "ok", pins });
      } else {
        throw ApiError.ServerError();
      };
    } catch (err) {
      next(err);
    };
  }

  async like(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const uid = res.locals.auth.id;
      const docId = await pinService.addLike(id, uid);
      console.log("Liked Pin Id: " + docId);
      if (docId) {
        res.json({ status: "ok", isLiked: true });
      } else {
        throw ApiError.ServerError();
      }
    } catch (err) {
      console.log("Like Errror: ", err);
      next(err);
    }
  }
  async deleteLike(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const uid = res.locals.auth.id;
      const docId = await pinService.deleteLike(id, uid);
      console.log("deleteLiked Pin Id: " + docId);
      if (docId) {
        res.json({ status: "ok", isLiked: false });
      } else {
        throw ApiError.ServerError();
      }
    } catch (err) {
      console.log("Delete Like Errror: ", err);
      next(err);
    }
  }

  async userPins(req: Request, res: Response, next: NextFunction) {
    try {
      const { uid } = res.locals.auth;
      const pins = await pinService.getUserPins(uid);
      if (pins) {
        res.json({ status: "ok", pins });
      } else {
        throw ApiError.ServerError();
      }
    } catch (err) {
      console.log("UserPINS ERR: ", err);
      next(err);
    }
  }

  async likedPins(req: Request, res: Response, next: NextFunction) {
    try {
      const uid = res.locals.auth.id;
      const pins = await pinService.getLikedPins(uid);
      console.log("Liked pins: ", pins);
      if (pins) {
        res.json({ status: "ok", pins });
      } else {
        throw ApiError.ServerError();
      }
    } catch (err) {
      console.log("LikedPINS ERR: ", err);
      next(err);
    }
  }
}

export default new PinController();
