import {Router} from 'express';
import register from './register';
import Current from './current';
import Login from './login';
import verifyToken from './verify-token';
import verifySend from './verify-send';
import resetPasswordSend from './reset-password-send';
import resetPasswordToken from './reset-password-token';
import changePassword from './change-password';
import ChangeRole from './change-rols';

const router = Router();

router.use('/register', register.getRouter());
router.use('/login', Login.getRouter());
router.use('/current', Current.getRouter());
router.use('/verify/send', verifySend.getRouter());
router.use('/verify/token', verifyToken.getRouter());
router.use('/reset-password/send', resetPasswordSend.getRouter());
router.use('/reset-password/token', resetPasswordToken.getRouter());
router.use('/change-password', changePassword.getRouter());
router.use('/change-role', ChangeRole.getRouter());

export default router;