import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { createWallet, deleteWallet, getAllWallets, getWallet } from "../controllers/wallet.controller";

const router = Router();


// Create Wallet
// POST (/wallets/create)
router.post('/wallets/create', protect, createWallet);

// Get All Wallet
// POST (/wallets)
router.get('/wallets', protect, getAllWallets);

// Get Wallet
// POST (/wallets/:id)
router.get('/wallets/:id', protect, getWallet);

// Delete Wallet
// POST (/wallets/delete/:id)
router.delete('/wallets/delete/:id', protect, deleteWallet);


export default router;