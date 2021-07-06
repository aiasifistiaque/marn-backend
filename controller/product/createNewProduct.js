import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

const createNewPorduct = asyncHandler(async (req, res) => {
	if (req.body.upload == true) {
	}

	try {
		const product = new Product({
			name: req.body.name,
			price: req.body.price,
			size: req.body.size,
			user: req.user._id,
			image: req.body.image,
			category: req.body.category,
			subCategory: req.body.subCategory,
			tag: req.body.tag,
			brand: req.body.brand,
			note: req.body.note,
			status: req.body.status,
			countInStock: req.body.countInStock,
			description: req.body.description,
		});
		const created = await product.save();
		res.status(201).json(created);
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

export default createNewPorduct;
