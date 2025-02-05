import { Router } from 'express';
import { adminPageRouter } from './api/adminPageRoute';
import { adminJWT } from './api/adminJWTRoute';

const router = Router();

router.use('/adminPage', adminPageRouter);
router.use('/adminJWT', adminJWT);

export default router;