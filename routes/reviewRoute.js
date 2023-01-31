import express from 'express';
import { admin, protect } from '../middleware/auth.js';
import writeReview from '../controller/product/writeReview.js';
import addToWishList from '../controller/product/addToWishList.js';
import deleteFromWishlist from '../controller/product/deleteFromWishlist.js';
import getWishList from '../controller/product/getWishlist.js';

const router = express.Router();

/**Swagger doc
 * completed
 * version 0.2
 * 18/07/21 03:36
 * total routes: 04
 * root: /api/review/
 */

router.put('/', protect, writeReview);
router.post('/addtowishlist/:id', protect, addToWishList);
router.post('/deletefromwishlist/:id', protect, deleteFromWishlist);
router.get('/getwishlist', protect, getWishList);

export default router;

/**
 * Route #1
 * @swagger
 * /review/:
 *   put:
 *     description: Post a review [PROTECT]
 *     parameters:
 *       - name: auth token
 *         description: USER auth token
 *         in: header
 *         required: true
 *         type: token
 *       - name: id
 *         description: id of the product
 *         in: req params
 *         required: true
 *         type: String
 *       - name: rating
 *         description: Rating given to the product
 *         in: req body
 *         required: true
 *         type: Number
 *       - name: comment
 *         description: Comment given to the product
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       400:
 *         description: String - error
 *       500:
 *         description: String - error
 *       201:
 *         description: returns {msg:String,product:Object} - updated product
 */

/**
 * Route #2
 * @swagger
 * /review/addtowishlist/{id}:
 *   post:
 *     description: Add a product to wishlist [PROTECT]
 *     parameters:
 *       - name: auth token
 *         description: USER auth token
 *         in: req params
 *         required: true
 *         type: String
 *       - name: id
 *         description: id of the product
 *         in: req params
 *         required: true
 *         type: String
 *     responses:
 *       400:
 *         description: String - error
 *       500:
 *         description: String - error
 *       200:
 *         description: returns {success:bol, wishlist:Array} - updated wishlist array
 */

/**
 * Route #3
 * @swagger
 * /review/deletefromwishlist/{id}:
 *   post:
 *     description: Removes a product from wishlist [PROTECT]
 *     parameters:
 *       - name: auth token
 *         description: USER auth token
 *         in: req params
 *         required: true
 *         type: String
 *       - name: id
 *         description: id of the product
 *         in: req params
 *         required: true
 *         type: String
 *     responses:
 *       400:
 *         description: String - error
 *       500:
 *         description: String - error
 *       200:
 *         description: returns {success:bol, wishlist:Array} - updated wishlist array
 */

/**
 * Route #4
 * @swagger
 * /review/getwishlist:
 *   get:
 *     description: Get user wishlist [PROTECT]
 *     parameters:
 *       - name: auth token
 *         description: USER auth token
 *         in: req params
 *         required: true
 *         type: String
 *     responses:
 *       400:
 *         description: String - error
 *       500:
 *         description: String - error
 *       200:
 *         description: returns wishlist:Array - wishlist array
 */
