import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { dishRouter } from './dish-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/dishes', dishRouter);

export default router;
