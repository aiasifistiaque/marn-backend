import Product from '../../models/productModel.js';

const updateProductVisibility = async (req, res) => {
	const { value } = req.body;

	try {
		let data = await Product.findById(req.params.id);

		data.status = value;

		const saved = await data.save();
		return res.status(200).json({ id: saved._id, update: saved.status });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default updateProductVisibility;
