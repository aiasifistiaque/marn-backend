import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/productModel.js';
import connectDB from '../db.js';
import colors from 'colors';
import Category from '../models/categoryModel.js';
import SubCategory from '../models/subCategoryModel.js';
//import { pData } from './data/pData.js';

dotenv.config();
connectDB();

const importData = async () => {
	let categories = [];
	let subCategories = [];
	let tags = [];

	try {
		const empty = await Category.deleteMany();

		const data = await Product.find();

		empty &&
			data.map(item => {
				if (categories.length == 0) {
					categories.push({ name: item.category });
				} else {
					const found = categories.some(i => i.name == item.category);
					if (!found) {
						categories.push({ name: item.category });
					}
				}
			});
		console.log(categories);
		await Category.insertMany(categories);
	} catch (e) {
		console.log(e);
		process.exit();
	}

	console.log('Data Imported!'.green.inverse);
	process.exit();
};

importData();
