import express from 'express'
import { login, profile, register } from '../controllers/user.controller.js';
import { validateSchema } from '../middleware/validateSchema.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';
import { validateToken } from '../middleware/validateToken.js';
export const router = express.Router();

router.post('/register', validateSchema(registerSchema), register);

router.post('/login',validateSchema(loginSchema),login);

router.get('/profile',profile);


