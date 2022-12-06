import { NextFunction, Request, Response } from "express";
import uniqid from "uniqid";

import ApiError from "lib/ApiError";
import pinService from "services/pin.service";

class PinController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const pins = await pinService.getPins();
      if(pins) {
        res.json({status: 'ok', pins})
      };
    } catch (err) {
      next(err);
    }
  };

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
  };

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const pinId = req.params.id;
      const pinData = await pinService.getPinById(pinId); 
      if(pinData) {
        res.json({ status: 'ok', pinData });
      } else {
        throw ApiError.NotFound();
      }
    } catch (err) {
      console.log('ERRR SHOW: ', err)
      next(err);
    }
  };

  async addComment(req: Request, res: Response, next: NextFunction) {
    const pinId = req.params.id;
    const comment = req.body;
    try {
      const comments = await pinService.addNewComment({...comment, pinId});
      res.json({
        status: 'ok',
        comments,
      });
    } catch (err) {
      console.log('ERRR ADD COMMENT: ', err)
      next(err);
    }
  };

  

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
      }
    } catch (err) {
      next(err);
    }
  };

  async delete(req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals.auth;
    const listId = req.params.id;
    try {
      const { id } = await pinService.removePin(listId, userId);
      if(id) {
        setTimeout(() => {
          res.json({
            deletedId: id,
          });

        }, 5000)
      } else {
        throw ApiError.ServerError();
      };
    } catch (err) {
      next(err);
    };
  };

  async samePins(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.params;
    const samePins = await pinService.getSamePins(category);
      if(samePins) {
        res.json({ status: 'ok', samePins});
      } else {
        throw ApiError.ServerError();
      }
    } catch (err) {
      next(err);
    }
  }
}

export default new PinController();
