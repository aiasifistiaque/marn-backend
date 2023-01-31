import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

const editProduct = asyncHandler(async (req, res) => {
	const {
		name,
		size,
		description,
		note,
		stock,
		price,
		category,
		subCategory,
		tag,
		status,
	} = req.body;
	console.log(req.body);

	try {
		const product = await Product.findById(req.params.id);
		product.name = name;
		product.size = size || '';
		product.description = description || '';
		product.note = note || '';
		product.price = price || 0;
		product.category = category || '';
		product.subCategory = subCategory || '';
		product.tag = tag || '';
		product.countInStock = stock || 0;
		product.status = status || '';

		const saveProd = await product.save();
		res.status(200).json(saveProd);
	} catch (e) {
		res.status(500).send('Error saving file');
	}
});

export default editProduct;
