import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

import mediaListService from "services/pin.service";

const listTitleSchema = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = res.locals.auth;
  const chain = body('title').isLength({min: 1})
  .withMessage('is required')
  .custom(async(value) => {
    return mediaListService.findListByTitle(userId, value)
      .then(list => {
        if(list) {
          return Promise.reject('Document with the same name already exists!')
        }
      })
  });
  chain(req, res, next);
}

export default listTitleSchema;
