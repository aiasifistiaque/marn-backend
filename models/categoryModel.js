import mongoose from 'mongoose';

export const categorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String,
			required: true,
			default: '/placeholder/category.jpeg',
		},

		status: {
			type: String,
			default: 'active',
		},

		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
