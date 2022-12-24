import { Express } from 'express';

import checkAuth from '../middlewares/checkAuth';

import authRouter from './auth';
import userRouter from './user';
import pinRouter from './pin';

function init(app: Express) {
  app.use('/auth', authRouter);
  app.use('/pins', checkAuth, pinRouter);
  app.use('/user/', checkAuth, userRouter);
}

export default init;
