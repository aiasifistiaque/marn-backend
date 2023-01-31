import mongoose from 'mongoose';

const tagSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String,
			required: true,
			default: '/placeholder/tag.jpeg',
		},

		category: {
			type: String,
		},

		subCategory: {
			type: String,
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

const Tag = mongoose.model('tag', tagSchema);

export default Tag;
