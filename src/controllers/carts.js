import { cartsModel } from "../models/carts.model.js";
import { productModel } from "../models/products.model.js";
import { ObjectId } from "mongodb";

export default class CartManager {
	constructor() {}

	getCarts = async () => {
		try {
			const carts = await cartsModel.find();
			return carts;
		} catch (error) {
			console.log(error);
		}
	};

	addCart = async (cart) => {
		try {
			const createdCart = cartsModel.create(cart);
			return createdCart;
		} catch (error) {
			console.log(error);
		}
	};

	getCartById = async (cartId) => {
		try {
			const cart = await cartsModel
				.findOne({ _id: new ObjectId(cartId) })
				.populate("products");
			return cart;
		} catch (error) {
			console.log(error);
		}
	};

	addProductToCart = async (cartId, productId, quantity) => {
		try {
			const updatedCart = await cartsModel.updateOne(
				{ _id: cartId },
				{ $push: { products: [{ product: productId, quantity }] } }
			);

			return updatedCart;
		} catch (error) {
			console.log(error);
		}
	};
}
