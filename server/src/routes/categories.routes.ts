import { Router } from "express";
import { createCategory, deleteCategory, getCategoriesByType, updateCategory } from "../controllers/categories.controller";
import { protect } from "../middleware/authMiddleware";


const router = Router();


// Create Category
// POST (/categories/create)
router.post('/categories/create', protect, createCategory);

// Delete Category
// DELETE (/categories/delete/:id)
router.delete('/categories/delete/:id', protect, deleteCategory);

// Get Categories by Type
// GET (/categories)
router.get('/categories', protect, getCategoriesByType);

// Update Category
// PUT(/categories/update/:id)
router.put('/categories/update/:id', protect, updateCategory);