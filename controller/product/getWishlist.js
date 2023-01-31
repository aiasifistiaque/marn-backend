import asyncHandler from 'express-async-handler';
import { User } from '../../models/userModel.js';

const getWishList = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select(['wishlist']);

		if (!user) {
			return res.status(400).send('User does not exist');
		} else {
			res.status(200).json(user.wishlist);
		}
	} catch (e) {
		res.status(500).send('Error');
	}
});

export default getWishList;
