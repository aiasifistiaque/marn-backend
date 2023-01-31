import { User } from '../models/userModel.js';
import mongoose from 'mongoose';
import express from 'express';
import _ from 'lodash';
import Joi from 'joi';
import bcrypt from 'bcrypt';

/**Swagger doc
 * completed
 * version 0.1
 * 14/09/21 15:01
 * total routes: 01
 * root: /api/auth/
 */

const router = express.Router();

//const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('email id does not exist');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) res.status(400).send('wrong password');

	try {
		const token = user.generateAuthToken();
		res.status(200).send(`Bearer ${token}`);
	} catch {
		res.send(500).send('Network error');
		e => console.log(e);
	}
});

function validate(user) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(user);
}

export default router;

/**
 * @swagger
 * /login:
 *   post:
 *     description: User login route
 *     parameters:
 *       - name: email
 *         in: req body
 *         required: true
 *         type: string
 *       - name: password
 *         in: req body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: String - token
 *       400:
 *         description: String - error
 *       500:
 *         description: String - error
 */
