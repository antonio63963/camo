import { Request, Response, NextFunction } from 'express';

import ApiError from 'lib/ApiError';

const checkIsTeacher = (request: Request, response: Response, next: NextFunction) => {
  const { isTeacher } = response.locals.auth;
  if(!isTeacher) {
    throw ApiError.ForbiddenError();
  } else {
    next();
  }
};

export default checkIsTeacher;