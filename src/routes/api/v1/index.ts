import {Router} from 'express';
import users from './users';
import tags from './tags';

const router = Router();

router.use('/users', users);
router.use('/tags', tags);

export default router;