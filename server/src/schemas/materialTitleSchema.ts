import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

import mediaListService from "services/pin.service";

const materialTitleSchema = (req: Request, res: Response, next: NextFunction) => {
  const listId = req.params.id;
  const chain = body('title').isLength({min: 1})
  .withMessage('is required')
  .custom(async(value) => {
    return mediaListService.findMaterialByTitle(listId, value)
      .then(mat => {
        if(mat && req.method === "POST") {
          return Promise.reject('Document with the same name already exists!')
        }
      })
  });
  chain(req, res, next);
}

export default materialTitleSchema;
