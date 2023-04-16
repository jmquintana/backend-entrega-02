import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;
const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
	products: [
		{
			type: Schema.ObjectId,
			ref: "products",
			quantity: Number,
		},
	],
});

cartSchema.plugin(mongoosePaginate);

export const cartModel = mongoose.model(cartCollection, cartSchema);
