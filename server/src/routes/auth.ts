import express from 'express';

import AuthController from 'controllers/AuthController';
import checkGoogle from 'middlewares/checkGoogle';
import {uploadFile, upload} from 'middlewares/upload';

const authRouter = express.Router();

authRouter.post('/signin', AuthController.signin);
authRouter.post('/signUp', AuthController.singnUp, uploadFile);
authRouter.post('/googleAuth', checkGoogle, AuthController.googleAuth);
authRouter.post('/logout', AuthController.logout);

export default authRouter;
