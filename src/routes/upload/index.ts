import {Router} from 'express';
import image from './image';

const router = Router();

router.use('/image', image);

export default router;