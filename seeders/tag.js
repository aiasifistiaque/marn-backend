import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/productModel.js';
import connectDB from '../db.js';
import colors from 'colors';
import Category from '../models/categoryModel.js';
import SubCategory from '../models/subCategoryModel.js';
import Tag from '../models/tagModel.js';
//import { pData } from './data/pData.js';

dotenv.config();
connectDB();

const importData = async () => {
	let categories = [];
	let subCategories = [];
	let tags = [];

	try {
		const empty = await Tag.deleteMany();

		const data = await Product.find();

		empty &&
			data.map(item => {
				if (item.tag && item.tag != '') {
					if (tags.length == 0) {
						tags.push({
							name: item.tag,
							image: item.image,
							category: item.category,
							subCategory: item.subCategory,
						});
					} else {
						const found = tags.some(i => i.name == item.tag);
						if (!found) {
							tags.push({
								name: item.tag,
								image: item.image,
								category: item.category,
								subCategory: item.subCategory,
							});
						}
					}
				}
			});
		console.log(tags);
		await Tag.insertMany(tags);
	} catch (e) {
		console.log(e);
		process.exit();
	}

	console.log('Data Imported!'.green.inverse);
	process.exit();
};

importData();
