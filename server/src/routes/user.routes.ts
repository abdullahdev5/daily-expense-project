import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getUser, setBaseCurrency } from '../controllers/user.controller';

const router = express.Router();


// Get User
// GET (/user)
router.get('/user', protect, getUser);

// Set base Currency
// POST (/user/base-currency)
router.post('/user/base-currency', protect, setBaseCurrency);


export default router;