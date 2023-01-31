import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

const getSingleProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const product = await Product.findById(id);
		res.status(200).json(product);
	} catch (error) {
		res.status(404).send(`Product #${id} not found`);
		//throw new Error(`Product no ${req.params.id} not found`);
	}
});

export default getSingleProduct;
