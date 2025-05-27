import express from 'express'
import { login, logout, profile, register, users } from '../controllers/user.controller.js';
import { validateSchema } from '../middleware/validateSchema.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';
import { validateToken } from '../middleware/validateToken.js';
import { validateIsAdmin } from '../middleware/validateIsAdmin.js';

export const router = express.Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login',validateSchema(loginSchema),login);
router.post('/logout',logout);
router.get('/users',validateToken ,validateIsAdmin,users);
router.get('/profile',validateToken,profile);


