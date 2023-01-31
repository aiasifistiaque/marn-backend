import { User } from '../../models/userModel.js';

const updateUserRole = async (req, res) => {
	const { value } = req.body;
	try {
		const data = await User.findById(req.params.id);

		data.role = value;
		const saved = await data.save();

		return res.status(200).json({ id: saved._id, updated: saved.role });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default updateUserRole;
