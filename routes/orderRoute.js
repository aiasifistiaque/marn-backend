import express from 'express';
import getSingleOrder from '../controller/order/getSingleOrder.js';
import getAllOrders from '../controller/order/getAllOrders.js';
import addNewOrder from '../controller/order/addNewOrder.js';
import getUserOrders from '../controller/order/getUserOrders.js';
import { admin, protect } from '../middleware/auth.js';
import changeOrderSeen from '../controller/order/changeOrderSeen.js';
import editOrder from '../controller/order/editOrder.js';

/**Swagger doc
 * completed
 * version 0.1
 * 17/07/21 21:40
 * total routes: 07
 * root: /api/order/
 */

const router = express.Router();

router
	.route('/')
	.get(protect, admin, getAllOrders)
	.post(protect, addNewOrder)
	.put(protect, admin, editOrder);

router.get('/:id', protect, getSingleOrder);
router.post('/userorder', protect, getUserOrders);
router.post('/getallorders', protect, admin, getAllOrders);
router.put('/changeseen', protect, admin, changeOrderSeen);

export default router;

/**
 * @swagger
 * /order:
 *   get:
 *     description: Get all the orders [ADMIN]
 *     parameters:
 *       - name: page
 *         description: page number default 0
 *         in: req body
 *         type: Number
 *       - name: perPage
 *         description: Number of products per page default 10
 *         in: req body
 *         type: Number
 *       - name: sort
 *         description: sort options [Newest,Oldest,Pending,Completed,Archived,Cancelled,Shipped,Confirmed,Ready For Shipping,New Orders]
 *         in: req body
 *         type: string
 *     responses:
 *       400:
 *         description: String - error message
 *       200:
 *         description: returns {Orders:Array, count:Number}
 */

/**
 * @swagger
 * /order:
 *   post:
 *     description: Crete a new order [PROTECT]
 *     parameters:
 *       - name: token
 *         description: auth token
 *         in: header token
 *         required: true
 *         type: token
 *       - name: orderItems
 *         description: Array of order items
 *         in: req body
 *         required: true
 *         type: Array
 *       - name: shippingAddress
 *         description: shipping address
 *         in: req body
 *         required: true
 *         type: Object
 *       - name: paymentMethod
 *         description: Payment method
 *         in: req body
 *         required: true
 *         type: String
 *       - name: itemPrice
 *         description: Price of items
 *         in: req body
 *         required: true
 *         type: Number
 *       - name: vat
 *         description: VAT
 *         in: req body
 *         required: true
 *         type: Number
 *       - name: shippingPrice
 *         description: shipping price
 *         in: req body
 *         required: true
 *         type: Number
 *       - name: totalPrice
 *         description: total order price including shipping and tax
 *         in: req body
 *         required: true
 *         type: Number
 *     responses:
 *       500:
 *         description: Object - {msg:String}
 *       201:
 *         description: returns {Order:object} order that has been created
 */

/**
 * @swagger
 * /order:
 *   put:
 *     description: Change status of an order [ADMIN]
 *     parameters:
 *       - name: id
 *         description: ID of the product
 *         in: req body
 *         required: true
 *         type: String
 *       - name: status
 *         description: status of order
 *         in: req body
 *         required: true
 *         type: string
 *       - name: paid
 *         description: payment status update
 *         in: req body
 *         type: string
 *     responses:
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {Object} upadted order
 */

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     description: get a single order by id [PROTECT]
 *     parameters:
 *       - name: id
 *         description: ID of the product
 *         in: req params
 *         required: true
 *         type: string
 *     responses:
 *       401:
 *         description: returns String - error message
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {Object} order
 */

/**
 * @swagger
 * /order/userorder:
 *   post:
 *     description: Get orders of an user [PROTECT]
 *     parameters:
 *       - name: page
 *         description: page number default 0
 *         in: req body
 *         type: Number
 *       - name: perPage
 *         description: Number of products per page default 10
 *         in: req body
 *         type: Number
 *       - name: sort
 *         description: sort options [Past,Current]
 *         in: req body
 *         type: string
 *     responses:
 *       500:
 *         description: returns {msg:String} - error message
 *       200:
 *         description: returns {orders:Array, count:Number}
 */

/**
 * @swagger
 * /order/getallorders:
 *   get:
 *     description: Get all the orders [ADMIN]
 *     parameters:
 *       - name: page
 *         description: page number default 0
 *         in: req body
 *         type: Number
 *       - name: perPage
 *         description: Number of products per page default 10
 *         in: req body
 *         type: Number
 *       - name: sort
 *         description: sort options [Newest,Oldest,Pending,Completed,Archived,Cancelled,Shipped,Confirmed,Ready For Shipping,New Orders]
 *         in: req body
 *         type: string
 *     responses:
 *       400:
 *         description: String - error message
 *       200:
 *         description: returns {Orders:Array, count:Number}
 */

/**
 * @swagger
 * /order/changeseen:
 *   put:
 *     description: Change seen status of order by admin [ADMIN]
 *     parameters:
 *       - name: token
 *         description: Admin auth token
 *         in: header
 *         required: true
 *         type: token
 *       - name: id
 *         description: ID of the order
 *         in: req body
 *         required: true
 *         type: String
 *       - name: seen
 *         description: Number of products per page default 10
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       400:
 *         description: String - error message
 *       200:
 *         description: returns {Orders:Array, count:Number}
 */
