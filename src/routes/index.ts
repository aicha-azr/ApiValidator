import express from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';

const router = express.Router();

router.get('/healthcheck', (_, res) => res.sendStatus(200));
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
