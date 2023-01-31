import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';

const editRole = asyncHandler(async (req, res) => {
	const { role, id } = req.body;
	try {
		const user = await User.findById(id).select(['-password']);
		user.role = role;
		const savedUser = await user.save();
		const orders = await Order.find({ user: user._id });
		res.status(200).json({ user: savedUser, orders: orders });
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

export default editRole;
