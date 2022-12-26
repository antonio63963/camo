import express from 'express';

import AuthController from 'controllers/UserController';
import checkGoogle from 'middlewares/checkGoogle';
import checkAuth from 'middlewares/checkAuth';

const authRouter = express.Router();

authRouter.post('/signin', AuthController.signin);
authRouter.post('/signUp', AuthController.singnUp);
authRouter.post('/googleAuth', checkGoogle, AuthController.googleAuth);
authRouter.post('/refresh', AuthController.refresh);
authRouter.get('/logout', checkAuth, AuthController.logout);

export default authRouter;
