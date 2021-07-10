import express from 'express';
import getSingleOrder from '../controller/order/getSingleOrder.js';
import getAllOrders from '../controller/order/getAllOrders.js';
import addNewOrder from '../controller/order/addNewOrder.js';
import getUserOrders from '../controller/order/getUserOrders.js';
import { admin, protect } from '../middleware/auth.js';
import changeOrderSeen from '../controller/order/changeOrderSeen.js';
import editOrder from '../controller/order/editOrder.js';

const router = express.Router();

router
	.route('/')
	.get(protect, admin, getAllOrders)
	.post(protect, addNewOrder)
	.put(protect, admin, editOrder);

/**
 * Get a single order
 * @param {string} id - id of element in router param
 * @param {string} authtoken - in header
 * @returns {Object} - Order
 */
router.get('/:id', protect, getSingleOrder);

/**
 * Get orders from user
 * @param {String} status - [Past,Current]
 * @param {Number} page - page number
 * @param {Number} perPage - number of queries per page
 * @param {token} authtoken - in header
 * @returns {Object} - [orders],count
 */
router.post('/userorder', protect, getUserOrders);

router.post('/getallorders', protect, admin, getAllOrders);

router.put('/changeseen', protect, admin, changeOrderSeen);

export default router;
