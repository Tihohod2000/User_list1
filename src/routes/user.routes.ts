// src/routes/user.routes.ts
import express from 'express';
import { getUserById, getUserList, BlockUser, authorizationUser, registrationUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/registration', registrationUser);
router.post('/authorization', authorizationUser);
router.get('/getUserList', getUserList);
router.get('/getUserById', getUserById);
router.post('/BlockUser', BlockUser);

export default router;
