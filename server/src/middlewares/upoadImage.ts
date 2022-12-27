import { Request, Response, NextFunction } from "express";

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  if(req.body.imagePath) {
    
  }
  const { uid } = res.locals.auth;
  console.log('Upoad: ', uid, req.body)
  if(req.body.imageLink) {
    res.locals.pin = {...req.body, image: req.body.imageLink, postedBy: uid };
    console.log('Locals Pin: ', res.locals.pin);
    next();
  } else {
    console.log('++++++You have to make upload MW!!!!++++++')
  }
};

export default uploadImage;