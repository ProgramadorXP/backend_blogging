import { Router } from 'express';
import { getAllUsers, getUserById, loginUser, updateUser, createAccount } from '../controllers/userController';
import { register, validateGetUser, login, validateUpdateUser } from '../middlewares/AuthValidation';
import { authenticateToken } from '../middlewares/auth';

const router: Router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', validateGetUser ,getUserById);
router.post('/signin', login, loginUser);
router.post('/signup', register, createAccount);
router.put('/users/update/:id', authenticateToken, validateUpdateUser, updateUser);

export default router;
