import { Router } from 'express';
import { loginUser, createAccount } from '../controllers/userController';
import { register, login } from '../middlewares/AuthValidation';

const router: Router = Router();

router.post('/signin', login, loginUser);
router.post('/signup', register, createAccount);

export default router;
