import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsCollection = "carts";

const cartsSchema = mongoose.Schema({
	products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "products",
			},
			quantity: {
				type: Number,
				default: 1,
			},
		},
	],
});

cartsSchema.plugin(mongoosePaginate);

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
