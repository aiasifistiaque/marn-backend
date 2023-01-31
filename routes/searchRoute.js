import express from 'express';
import Product from '../models/productModel.js';
//import City from '../models/cityModel.js';

const router = express.Router();

/**Swagger doc
 * completed
 * version 0.1
 * 17/07/21 21:40
 * total routes: 01
 * root: /api/search/
 */

router.post('/', async (req, res) => {
	let products = [];
	try {
		const regex = { $regex: req.body.searchString, $options: 'i' };
		if (req.body.searchString.length < 1)
			res.status(200).json({ products: [] });
		if (req.body.searchString.length > 0) {
			products = await Product.find()
				.where({
					$or: [
						{ name: regex },
						{ category: regex },
						{ subCategory: regex },
						{ tag: regex },
					],
					status: { $nin: ['archived', 'hidden'] },
				})
				.limit(10);
		}
		res.status(200).json(products);
	} catch (e) {
		res.status(500).json(e.message);
	}
});

export default router;

/**
 * @swagger
 * /search:
 *   post:
 *     description: Search for product or category, sub, tag
 *     parameters:
 *       - name: searchString
 *         description: search string
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       500:
 *         description: returns String - error message
 *       200:
 *         description: returns products:Array - list of products
 */
