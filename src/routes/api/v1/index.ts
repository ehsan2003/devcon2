import {Router} from 'express';

const router = Router();

import users from './users';
router.use('/users',users);

export default router;