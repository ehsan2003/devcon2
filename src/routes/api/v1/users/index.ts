import {Router} from 'express';
import register from './register';
import Current from './current';
import Login from './login';

const router = Router();

router.use('/register', register.getRouter());
router.use('/login', Login.getRouter());
router.use('/current', Current.getRouter());

export default router;