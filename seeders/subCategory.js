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
		const empty = await SubCategory.deleteMany();

		const data = await Product.find();

		empty &&
			data.map(item => {
				if (item.subCategory && item.subCategory != '') {
					if (subCategories.length == 0) {
						subCategories.push({
							image: item.image,
							name: item.subCategory,
							category: item.category,
						});
					} else {
						const found = subCategories.some(i => i.name == item.subCategory);
						if (!found) {
							subCategories.push({
								image: item.image,
								name: item.subCategory,
								category: item.category,
							});
						}
					}
				}
			});
		console.log(subCategories);
		await SubCategory.insertMany(subCategories);
	} catch (e) {
		console.log(e);
		process.exit();
	}

	console.log('Data Imported!'.green.inverse);
	process.exit();
};

importData();
