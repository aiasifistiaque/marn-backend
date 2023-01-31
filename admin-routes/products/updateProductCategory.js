import Category from '../../models/categoryModel.js';
import Product from '../../models/productModel.js';

const updateProductCategory = async (req, res) => {
	const { id } = req.body;

	try {
		let data = await Product.findById(req.params.id);
		const category = await Category.find({ name: id });

		data.category = id;
		data.categoryId = category._id;

		const saved = await data.save();

		return res.status(200).json(saved);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default updateProductCategory;
