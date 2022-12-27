import { NextFunction, Request, Response } from "express";

import pinService from "services/pin.service";

class PinController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const pins = await pinService.getPins();
      res.json({ status: "ok", pins });
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    console.log('CreatePin: ', req.body)
    try {
      const createdPin = await pinService.createPin(req.body);
      res.json({
        pin: createdPin,
      });
    } catch (err) {
      console.log('CreatePin ERROR: ', err)
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const pinId = req.params.id;
      const pinData = await pinService.getPinById(pinId);
      res.json({ status: "ok", pinData });
    } catch (err) {
      next(err);
    }
  }

  async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      const comments = await pinService.addNewComment({
        ...req.body,
        pinId: req.params.id,
      });
      res.json({
        status: "ok",
        comments,
      });
    } catch (err) {
      next(err);
    }
  }

  async editImage(req: Request, res: Response, next: NextFunction) {
    const payload = {
      uid: res.locals.auth.uid,
       pinId: req.params.id,
       ...req.body,
    }
    try {
      const image = await pinService.changeImage(
       payload
      );
      res.json({
        status: "ok",
        ...image,
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { uid } = res.locals.auth;
    const pinId = req.params.id;
    try {
      await pinService.removePin(pinId, uid);
      res.json({
        status: "ok",
      });
    } catch (err) {
      next(err);
    }
  }

  async samePins(req: Request, res: Response, next: NextFunction) {
    try {
      const pins = await pinService.getSamePins(req.params.category);

      res.json({ status: "ok", pins });
    } catch (err) {
      next(err);
    }
  }

  async like(req: Request, res: Response, next: NextFunction) {
    try {
      await pinService.addLike(req.params.id, res.locals.auth.uid);
      res.json({ status: "ok", isLiked: true });
    } catch (err) {
      console.log("Like Errror: ", err);
      next(err);
    }
  }
  async deleteLike(req: Request, res: Response, next: NextFunction) {
    try {
      await pinService.deleteLike(req.params.id, res.locals.auth.uid);
      res.json({ status: "ok", isLiked: false });
    } catch (err) {
      console.log("Delete Like Errror: ", err);
      next(err);
    }
  }

  async userPins(req: Request, res: Response, next: NextFunction) {
    try {
      const pins = await pinService.getUserPins(res.locals.auth.uid);

      res.json({ status: "ok", pins });
    } catch (err) {
      console.log("UserPINS ERR: ", err);
      next(err);
    }
  }

  async likedPins(req: Request, res: Response, next: NextFunction) {
    try {
      const pins = await pinService.getLikedPins(res.locals.auth.uid);

      res.json({ status: "ok", pins });
    } catch (err) {
      console.log("LikedPINS ERR: ", err);
      next(err);
    }
  }
  async searchPins(req: Request, res: Response, next: NextFunction) {
    try {
      const { searchTerm } = req.params;
      const pins = await pinService.search(searchTerm);
      res.json({ status: "ok", pins });
    } catch (err) {
      console.log("Search ERR: ", err);
      next(err);
    }
  }
}

export default new PinController();
