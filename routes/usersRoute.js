import { User, validate } from '../models/userModel.js';
import mongoose from 'mongoose';
import express from 'express';
import _ from 'lodash';
import Joi from 'joi';
import bcrypt from 'bcrypt';

/**Swagger doc
 * completed
 * version 0.1
 * 17/07/21 21:50
 * total routes: 01
 * root: /api/register/
 */

const router = express.Router();

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('user already registered..');

	user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	try {
		await user.save();

		const token = user.generateAuthToken();
		res
			.status(200)
			.header('x-auth-token', token)
			.send(_.pick(user, ['_id', 'name', 'email', 'role']));
	} catch (e) {
		res.status(500).send(e);
	}
});

/**
 * @swagger
 * /register:
 *   post:
 *     description: Sign up/Register a new user
 *     parameters:
 *       - name: name
 *         in: req body
 *         required: true
 *         type: string
 *       - name: email
 *         in: req body
 *         required: true
 *         type: string
 *       - name: password
 *         in: req body
 *         required: true
 *         type: string
 *     responses:
 *       400:
 *         description: String - error message
 *       200:
 *         description: returns {user} and token in header
 */

export default router;
