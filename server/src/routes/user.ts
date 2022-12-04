import express from 'express';

import UserController from 'controllers/UserController';

const authRouter = express.Router();

authRouter.get('/current', UserController.current);

export default authRouter;
