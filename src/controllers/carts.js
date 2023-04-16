import { cartModel } from "../models/carts.model.js";
import { productModel } from "../models/products.model.js";
import { ObjectId } from "mongodb";

export default class CartManager {
	constructor() {}
	getCarts = async () => {
		try {
			const carts = await cartModel.find();
			return carts;
		} catch (error) {
			console.log(error);
		}
	};
	addProductToCart = async (cartId, productId, quantity) => {
		try {
			const product = await productModel.findOne({ _id: ObjectId(productId) });
			if (!product) {
				throw new Error("Product not found");
			}
			if (!cart) {
				cart = await cartModel.create({ products: [] });
			}
			const cart = await cartModel.findOne({ _id: ObjectId(cartId) });
			const productInCart = cart.products.find(
				(p) => p.productId.toString() === productId.toString()
			);
			if (productInCart) {
				productInCart.quantity += quantity;
			} else {
				cart.products.push({ productId, quantity });
			}
		} catch (error) {
			console.log(error);
		}
	};
}
