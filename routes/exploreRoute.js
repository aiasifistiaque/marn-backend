import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

/**Swagger doc
 * completed
 * version 0.1
 * 17/07/21 21:50
 * total routes: 01
 * root: /api/explore/
 */

const router = express.Router();

router.post(
	'/',
	asyncHandler(async (req, res) => {
		let sort = 'createdAt';
		const option = req.body.sort;
		const page = req.body.page || 0;
		const perPage = req.page.perPage || 12;

		if (option == 'newest') sort = '-createdAt';
		else if (option == 'oldest') sort = 'createdAt';
		else if (option == 'nameAsc') sort = 'name';
		else if (option == 'nameDec') sort = '-name';
		else if (option == 'priceUp') sort = 'price';
		else if (option == 'priceDown') sort = '-price';

		const products = await Product.find({
			status: { $nin: ['hidden', 'archived'] },
		})
			.limit(perPage)
			.skip(page * perPage)
			.sort(sort);

		if (products) {
			res.status(200).json({
				products: products,
				sort: sort,
				items: products.length,
				page: page,
			});
		} else {
			res.status(500).send('Network error, please try again');
			throw new Error('there was an error');
		}
	})
);

export default router;

/**
 * @swagger
 * /explore:
 *   post:
 *     description: Get all the products
 *     parameters:
 *       - name: page
 *         description: page number default 0
 *         in: req body
 *         type: Number
 *       - name: perPage
 *         description: Number of products per page default 12
 *         in: req body
 *         type: Number
 *       - name: sort
 *         description: sort options [newest,oldest,nameAsc,nameDsc,priceUp,priceDown]
 *         in: req body
 *         type: string
 *     responses:
 *       500:
 *         description: String - error message
 *       200:
 *         description: returns {[products]:Array, sort:String, items:Number, page:Number}
 */
