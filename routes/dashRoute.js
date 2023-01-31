import express from 'express';
import { admin, protect } from '../middleware/auth.js';
import getDashBoard from '../controller/dash/getDashBoard.js';

const router = express.Router();

/**Swagger doc
 * completed
 * version 0.2
 * 18/07/21 03:22
 * total routes: 01
 * root: /api/dashboard/
 */

router.route('/').post(getDashBoard);

export default router;

/**
 * Route #1
 * @swagger
 * /dashboard:
 *   post:
 *     description: Get admin dashboard
 *     parameters:
 *       - name: option
 *         description: option [all orders, completed orders, pending orders, all users, admin users, all products]
 *         in: req params
 *         required: true
 *         type: String
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: returns {count:Number, total:Number}
 */
