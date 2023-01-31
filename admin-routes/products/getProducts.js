import Product from '../../models/productModel.js';

const getProducts = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	const search = req.query.search || '';

	const query = {
		$or: [
			{ name: { $regex: search, $options: 'i' } },
			{ category: { $regex: search, $options: 'i' } },
		],
	};

	try {
		const data = await Product.find(query).sort(sort).limit(perpage).skip(skip);
		const count = await Product.count(query);

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getProducts;
