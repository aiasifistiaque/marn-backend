import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import connectDB from './db.js';
import colors from 'colors';
import { pData } from './data/pData.js';

dotenv.config();
connectDB();

const importData = async () => {
	try {
		//await Order.deleteMany();
		await Product.deleteMany();

		const sampleProducts = pData.map(product => {
			return { ...product, user: '60e5678145791d00159e52b0' };
		});

		await Product.insertMany(sampleProducts);

		console.log('Data Imported!'.green.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

importData();
