import {Router} from 'express';

const router = Router();
import register from './register';
router.use('/register',register.getRouter());

export default router;