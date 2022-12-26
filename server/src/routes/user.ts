import express from 'express';

import UserController from 'controllers/UserController';
import { uploadAvatar } from 'middlewares/upload';

const userRouter = express.Router();

userRouter.put('/avatar', uploadAvatar, UserController.changeAvatar);

export default userRouter;
