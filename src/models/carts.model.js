import mongoose from "mongoose";

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

cartsSchema.pre("findOne", function () {
	this.populate("products.product");
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
