import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../db.js';
import colors from 'colors';
import { pData } from '../data/pData.js';
import Category from '../models/categoryModel.js';

dotenv.config();
connectDB();

const importData = async () => {
	//await Order.deleteMany();

	const sampleProducts = pData.map(async product => {
		try {
			console.log('asds');
			const cat = await new Category({ name: 'offer' }).save();
			console.log(cat);
		} catch (e) {
			console.log(e);
		}
	});

	console.log('Data Imported!'.green.inverse);
	process.exit();
};

importData();
