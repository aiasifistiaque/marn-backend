import express from 'express';
import {
	getAllCategories,
	getProductByCategory,
	getHomeProductByCategory,
	getProductsBySubCategory,
	getProductsByTag,
	getTAgs,
	getSubCategoryList,
} from '../controller/product/getAllCategories.js';

/**Swagger doc
 * completed
 * version 0.1
 * 17/07/21 21:50
 * total routes: 06
 * root: /api/categories/
 */

const router = express.Router();

/**This route has not been documented */
router.get('/homecat/:id', getHomeProductByCategory);

router.get('/', getAllCategories);

router.post('/sub', getSubCategoryList);

router.get('/tag', getTAgs);

router.post('/cat/:id', getProductByCategory);

router.post('/subcategory/:id', getProductsBySubCategory);

router.post('/tag/:id', getProductsByTag);

export default router;

/**
 * @swagger
 * /categories:
 *   get:
 *     description: Get the name of all categories
 *     responses:
 *       500:
 *         description: String - error message
 *       200:
 *         description: returns [Array] name of the categories
 */

/**
 * @swagger
 * /cagegories/sub:
 *   post:
 *     description: Get name and images of sub categories or tags
 *     parameters:
 *       - name: type
 *         description: Name of the sub category/tag
 *         in: req body
 *         required: true
 *         type: string
 *       - name: id
 *         description: options sub/tag
 *         in: req body
 *         required: true
 *         type: string
 *     responses:
 *       500:
 *         description: String - error message
 *       200:
 *         description: returns [{Object}] Array of objects of sub/tag name & images
 */

/**
 * @swagger
 * /categories/tag:
 *   get:
 *     description: Get the name of all tags
 *     responses:
 *       500:
 *         description: String - error message
 *       200:
 *         description: returns [Array] name of the tags
 */

/**
 * @swagger
 * /categories/cat/{id}:
 *   post:
 *     description: Get products of a category
 *     parameters:
 *       - name: id
 *         description: Name of the category
 *         in: req param
 *         required: true
 *         type: String
 *       - name: page
 *         description: page number default 0
 *         in: req body
 *     responses:
 *       400:
 *         description: String - error message
 *       200:
 *         description: returns {user} and token in header
 */

/**
 * @swagger
 * /categories/subcategory/{id}:
 *   post:
 *     description: Get products of a sub category
 *     parameters:
 *       - name: id
 *         description: Name of the sub category
 *         in: req params
 *         required: true
 *         type: String
 *       - name: page
 *         description: page number default 0
 *         in: req body
 *         type: Number
 *     responses:
 *       400:
 *         description: String - error message
 *       200:
 *         description: returns {user} and token in header
 */

/**
 * @swagger
 * /categories/tag/{id}:
 *   post:
 *     description: Get products of a tag
 *     parameters:
 *       - name: id
 *         description: Name of the tag
 *         in: req params
 *         required: true
 *         type: String
 *       - name: page
 *         description: page number default 0
 *         in: req body
 *         type: Number
 *     responses:
 *       400:
 *         description: String - error message
 *       200:
 *         description: returns {user} and token in header
 */
