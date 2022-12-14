import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';

import routes from 'routes';
import errorMiddleware from 'middlewares/errorMiddleware';
import runDB from '../db';

const app = express();

app.use(express.static(path.join(__dirname, '../../upload')));

app.use(cors({
  origin: '*',
}));
app.use(helmet());
app.use(express.json());

routes(app);
app.use(errorMiddleware);
runDB();

export default app;
