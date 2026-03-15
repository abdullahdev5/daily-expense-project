import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { login, registerUser, getUser, googleAuth, facebookAuth } from '../controllers/auth.controller';

const router = express.Router();


// Register User
// POST (/register)
router.post('/register', registerUser);

// Login
// POST (/login)
router.post('/login', login);

// Google Auth
// POST (/google)
router.post('/google', googleAuth);

// Facebook Auth
// POST (/facebook)
router.post('/facebook', facebookAuth);

// Get User
// GET (/user)
router.get('/user', protect, getUser);


export default router;