import express from 'express';
import { signup, login, confirmSignup } from './auth';

const router = express.Router();

// SIGNUP ROUTE
router.post('/auth/signup', (req, res) => signup(req, res));
router.get('/auth/confirmSignup', (req, res) => confirmSignup(req, res));
// LOGIN ROUTE
router.post('/auth/login', (req, res) => login(req, res));

export default router;
