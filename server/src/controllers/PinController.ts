import { NextFunction, Request, Response } from "express";
import uniqid from "uniqid";

import ApiError from "lib/ApiError";
import pinService from "services/pin.service";

class PinController {
  async index(req: Request, res: Response, next: NextFunction) {
    console.log('Pin index: ', req.params);
    try {
      const pins = await pinService.getPins();
      console.log('PINS GET: ', pins);
      if(pins) {
        res.json({status: 'ok', pins})
      };
    } catch (err) {
      next(err);
    }
  };

  async create(req: Request, res: Response, next: NextFunction) {
    console.log('PIN: start')
    const { pin } = res.locals;

    console.log('PIN: ', pin)
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
    console.log('ADDD CMMM', comment)
    try {
      const comments = await pinService.addNewComment({...comment, pinId});
      console.log('After commit: ', comments)
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

  students(req: Request, res: Response) {
    setTimeout(() => {
      res.json({
        students: [
          {
            id: "asdfa534j",
            email: "christoffer_larrson@gmail.com",
            isActive: true,
          },
          {
            id: "asdfa554j",
            email: "ceciliaholmbergl1995@gmail.com",
            isActive: false,
          },
          {
            id: "asdfa564j",
            email: "margpettersson1990@yahoo.com",
            isActive: true,
          },
          {
            id: "asdfa574j",
            email: "margpettersson1990@yahoo.shmahu",
            isActive: true,
          },
        ],
      });
    }, 2000);
  };

  // async createMaterial(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { userId } = res.locals.auth;
  //     const listId = req.params.id;

  //     const result = await pinService.createMaterial(
  //       listId,
  //       userId,
  //       req.body
  //     );

  //     if (result.lastErrorObject.updatedExisting) {
  //       res.json({
  //         // result: result.value.materials[0],
  //       });
  //     } else {
  //       throw ApiError.ServerError();
  //     };
  //   } catch (err) {
  //     next(err);
  //   };
  // };

  // async editMaterial(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { userId } = res.locals.auth;
  //     const listId = req.params.id;
  //     const result = await pinService.editMaterial(
  //       listId,
  //       userId,
  //       req.body
  //     );

  //     if (result.lastErrorObject.updatedExisting) {
  //       res.json({
  //         // result: result.value.materials[0],
  //       });
  //     } else {
  //       throw ApiError.ServerError();
  //     };
  //   } catch (err) {
  //     next(err);
  //   };
  // };

  async deleteMaterial(req: Request, res: Response, next: NextFunction) {
    try {
      const { materialId } = req.body
      const { userId } = res.locals.auth;
      const listId = req.params.id;
      const result = await pinService.removeMaterial(listId, userId, materialId);

      if(result.lastErrorObject.updatedExisting) {
        setTimeout(() => {
          res.json({
            // result: result.value.materials[0],
          });

        }, 1000)
      } else {
        throw ApiError.ServerError();
      };
    } catch (err) {
      next(err);
    };
  };
}

export default new PinController();
