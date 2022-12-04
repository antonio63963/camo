import { Request, Response } from 'express';
import ApiError from 'lib/ApiError';

function errorMiddleware(err: any, req: Request, res: Response, next: any) {
  if(err instanceof ApiError) {
    return res.status(err.status).json({message: err.message, errors: err.errors});
  };
  return res.status(500).json({message: err.message, errors: err.errors});
};

export default errorMiddleware;