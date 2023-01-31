import express from 'express';
import { admin, protect } from '../../middleware/auth.js';
import { sort } from '../../middleware/sort.js';
import getOrders from './getOrders.js';
import updateOrderStatus from './updateOrderStatus.js';

const router = express.Router();

router.get('/', sort, getOrders);
router.put('/:id', sort, updateOrderStatus);

export default router;
