import express from 'express';

import UserController from 'controllers/UserController';
import { uploadFile } from 'middlewares/upload';

const userRouter = express.Router();

userRouter.get('/', UserController.index);
userRouter.put('/avatar', uploadFile, UserController.changeAvatar);

export default userRouter;
