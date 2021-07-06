import express from 'express';
import {
	getAllCategories,
	getSubCategories,
	getProductByCategory,
	getHomeProductByCategory,
	getProductsBySubCategory,
	getProductsByTag,
	getTAgs,
} from '../controller/product/getAllCategories.js';

const router = express.Router();

router.get('/homecat/:id', getHomeProductByCategory);

/**
 * /api/categories
 * Get names of sub categories
 * @returns {Promise} array of all sub categories
 */
router.get('/', getAllCategories);

/**
 * /api/categories
 * Get names of sub categories
 * @returns {Promise} array of all sub categories
 */
router.get('/sub', getSubCategories);

/**
 * /api/categories
 * Get names of sub categories
 * @returns {Promise} array of all tags
 */
router.get('/tag', getTAgs);

/**
 * /api/categories
 * Get all products of a category
 * @param {number} page page number
 * @param {String} id id of the category
 * @returns {Promise} array of products (50) per page
 */
router.post('/cat/:id', getProductByCategory);

/**
 * /api/categories
 * Get all products of a sub category
 * @param {number} page page number
 * @param {String} id id of the category
 * @returns {Promise} array of products (50) per page
 */
router.post('/subcategory/:id', getProductsBySubCategory);

/**
 * /api/categories
 * Get all products of a sub category
 * @param {number} page page number
 * @param {String} id id of the category
 * @returns {Promise} array of products (50) per page
 */
router.post('/tag/:id', getProductsByTag);

export default router;
