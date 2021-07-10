import Product from '../../models/productModel.js';
import asyncHandler from 'express-async-handler';

const perPage = 20;

export const getAllCategories = asyncHandler(async (req, res) => {
	let sort = '-createdAt';
	const categories = await Product.distinct('category');

	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});

export const getProductByCategory = asyncHandler(async (req, res) => {
	let sort = '-createdAt';

	const page = req.body.page || 0;

	const categories = await Product.find({
		$and: [
			{ category: req.params.id },
			{
				status: { $nin: ['hidden', 'archived'] },
			},
		],
	})
		.sort(sort)
		.skip(page * perPage)
		.limit(perPage);
	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});

export const getProductsBySubCategory = asyncHandler(async (req, res) => {
	let sort = '-createdAt';

	const page = req.body.page || 0;

	const categories = await Product.find({
		$and: [
			{ subCategory: req.params.id },
			{
				status: { $nin: ['hidden', 'archived'] },
			},
		],
	})
		.sort(sort)
		.skip(page * perPage)
		.limit(perPage);
	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});

export const getProductsByTag = asyncHandler(async (req, res) => {
	let sort = '-createdAt';

	const page = req.body.page || 0;

	const categories = await Product.find({
		$and: [
			{ tag: req.params.id },
			{
				status: { $nin: ['hidden', 'archived'] },
			},
		],
	})
		.sort(sort)
		.skip(page * perPage)
		.limit(perPage);
	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});

export const getHomeProductByCategory = asyncHandler(async (req, res) => {
	let sort = '-createdAt';

	const categories = await Product.find({
		$and: [
			{ category: req.params.id },
			{
				status: { $nin: ['hidden', 'archived'] },
			},
		],
	})
		.sort(sort)
		.limit(6);

	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});

export const getSubCategories = asyncHandler(async (req, res) => {
	let sort = '-createdAt';

	const categories = await Product.distinct('subCategory');

	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});

export const getTAgs = asyncHandler(async (req, res) => {
	let sort = '-createdAt';

	const categories = await Product.distinct('tag');

	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(500);
		throw new Error('there was an error');
	}
});
