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

	addProductToCart = async (productId, cartId, quantity) => {
		try {
			const updatedCart = await cartsModel.updateOne(
				{ _id: new ObjectId(cartId) },
				{
					$push: { products: [{ product: new ObjectId(productId), quantity }] },
				}
			);

			return updatedCart;
		} catch (error) {
			console.log(error);
		}
	};

	updateCart = async (cartId, products) => {
		try {
			const updatedCart = await cartsModel.updateOne(
				{ _id: new ObjectId(cartId) },
				{
					$set: { products: products },
				}
			);

			return updatedCart;
		} catch (error) {
			console.log(error);
		}
	};

	deleteCart = async (cartId) => {
		try {
			const deletedCart = await cartsModel.deleteOne({
				_id: new ObjectId(cartId),
			});
			return deletedCart;
		} catch (error) {
			console.log(error);
		}
	};

	deleteProductFromCart = async (productId, cartId) => {
		try {
			const updatedCart = await cartsModel.updateOne(
				{ _id: new ObjectId(cartId) },
				{
					$pull: { products: { product: new ObjectId(productId) } },
				}
			);
			return updatedCart;
		} catch (error) {
			console.log(error);
		}
	};
}
