import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

import mediaListService from "services/pin.service";

const materialUrlSchema = (req: Request, res: Response, next: NextFunction) => {
  const listId = req.params.id;
  const chain = body('url').exists()
  .withMessage('is required')
  .isURL()
  .withMessage('is invalid')
  .custom(async(value) => {
    return mediaListService.findMaterialByUrl(listId, value)
      .then(mat => {
        if(mat && req.method === "POST") {
          return Promise.reject('Document with the same url already exists!');
        }
      });
  });
  chain(req, res, next);
}

export default materialUrlSchema;
