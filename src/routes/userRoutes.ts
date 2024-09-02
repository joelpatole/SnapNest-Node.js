import { Router } from 'express';
import { getUser } from '../controllers/userController';

const router = Router();

router.get('/user/:id' ,getUser);

export default router;