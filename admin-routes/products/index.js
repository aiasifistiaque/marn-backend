import express from 'express';
import { admin, protect } from '../../middleware/auth.js';
import { sort } from '../../middleware/sort.js';
import getProducts from './getProducts.js';
import updateProductCategory from './updateProductCategory.js';
import updateProductVisibility from './updateProductVisibility.js';

const router = express.Router();

// router.post('/', getAllProducts);
// router
// 	.route('/:id')
// 	.get(getSingleProduct)
// 	.put(protect, admin, editProduct)
// 	.delete(protect, admin, deleteProduct);
// router.post('/createproduct', protect, admin, createNewPorduct);
// router.post('/changepicture', changePicture);

router.get('/', sort, getProducts);
router.put('/:id/category', updateProductCategory);
router.put('/:id/visibility', updateProductVisibility);

export default router;
