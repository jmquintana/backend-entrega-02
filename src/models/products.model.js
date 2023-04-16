import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new mongoose.Schema({
	title: String,
	description: String,
	category: String,
	code: {
		type: String,
		unique: true,
	},
	price: Number,
	stock: Number,
	thumbnails: {
		type: Object,
		default: [],
	},
	status: {
		type: Boolean,
		default: true,
	},
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);
