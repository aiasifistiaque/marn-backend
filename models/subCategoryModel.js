import mongoose from 'mongoose';

const subCategorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String,
			required: true,
			default: '/placeholder/subcategory.jpeg',
		},

		category: {
			type: String,
			required: true,
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

const SubCategory = mongoose.model('Subcategory', subCategorySchema);

export default SubCategory;
