import express from 'express';
import usersController from '../controllers/userController.js';

const router = express.Router();

router.post('/register', usersController.registerUser);

export default router;
