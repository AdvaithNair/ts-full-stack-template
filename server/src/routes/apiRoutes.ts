import express from 'express';
import userRouter from './userRoutes';

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
// apiRouter.use('/test', (_req, res) => res.send('test'));

export default apiRouter;
