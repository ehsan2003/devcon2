import {Router} from 'express';
import insert from './insert';

const router = Router();

router.use('/insert', insert.getRouter());

export default router;