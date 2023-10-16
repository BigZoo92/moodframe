import express from 'express';
import { signup, login } from '../utils';

const router = express.Router();

// SIGNUP ROUTE
router.post('/auth/signup', (req, res) => signup(req, res));
// LOGIN ROUTE
router.post('/auth/login', (req, res) => login(req, res));

export default router;
