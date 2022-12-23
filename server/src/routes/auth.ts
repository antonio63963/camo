import express from 'express';

import AuthController from 'controllers/AuthController';
import checkGoogle from 'middlewares/checkGoogle';
import {uploadFile} from 'middlewares/upload';

const authRouter = express.Router();

authRouter.post('/signin', AuthController.signin);
authRouter.post('/signUp', uploadFile, AuthController.singnUp);
authRouter.post('/googleAuth', checkGoogle, AuthController.googleAuth);
authRouter.post('/logout', AuthController.logout);

export default authRouter;
