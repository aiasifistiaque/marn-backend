import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';
import bcrypt from 'bcrypt';

const resetPassword = asyncHandler(async (req, res) => {
	const { email, otp, password } = req.body;
	try {
		const foundUser = await User.findOne({ email: email });

		if (foundUser == null) return res.status(400).send('Error, try again');

		if (foundUser.resetCode != otp) {
			return res.status(400).send('OTP has expired, try again');
		}

		const salt = await bcrypt.genSalt(10);
		foundUser.password = await bcrypt.hash(password, salt);
		foundUser.resetCode = null;

		const changed = await foundUser.save();

		return res.status(200).json({ status: 'success', email: changed.email });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: e.message });
	}
});

export default resetPassword;
