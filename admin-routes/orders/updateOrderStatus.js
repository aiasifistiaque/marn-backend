import Order from '../../models/orderModel.js';

const updateOrderStatus = async (req, res) => {
	const { status, value } = req.body;
	try {
		const data = await Order.findById(req.params.id);

		if (data.status == 'completed' || data.status == 'cancelled') {
			return res
				.status(500)
				.json({ message: `${data.status} orders can not be updated` });
		}

		data.status = status;
		const saved = await data.save();

		return res.status(200).json(saved);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default updateOrderStatus;
