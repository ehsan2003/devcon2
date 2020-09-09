import {Router} from 'express';
import create from './create';

const router = Router();
router.use('/create', create.getRouter());


export default router;