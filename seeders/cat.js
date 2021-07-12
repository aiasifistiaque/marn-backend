import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../db.js';
import colors from 'colors';
import { pData } from './data/pData.js';
import Category from '../models/categoryModel.js';

dotenv.config();

const importData = async () => {
	connectDB();

	try {
		//await Order.deleteMany();
		await Category.deleteMany();

		const sampleProducts = pData.map(product => {
			return { name: product.category };
		});

		await Category.insertMany(sampleProducts);

		console.log('Data Imported!'.green.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

importData();
