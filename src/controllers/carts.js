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
				.populate("products.product")
				.lean();

			return cart;
		} catch (error) {
			console.log(error);
		}
	};

	addProductToCart = async (productId, cartId, quantity = 1) => {
		try {
			//get product from Model
			const product = await productModel.findOne({
				_id: new ObjectId(productId),
			});
			if (!product) throw new Error("Product not found");
			//get cart from Model
			const cart = await cartsModel.findOne({
				_id: new ObjectId(cartId),
			});
			if (!cart) throw new Error("Cart not found");
			//check if product is already in cart
			const productInCart = cart.products.find(
				(product) => product.product._id == productId
			);
			//if product is already in cart, update quantity
			if (productInCart) {
				productInCart.quantity += quantity;
				//update cart
				const updatedCart = await this.updateCart(cartId, cart.products);
				return updatedCart;
			}
			//if product is not in cart, add it
			else {
				//create new product object
				const newProduct = {
					product: new ObjectId(productId),
					quantity: quantity,
				};
				//add product to cart
				cart.products.push(newProduct);
				//update cart
				const updatedCart = await this.updateCart(cartId, cart.products);
				return updatedCart;
			}
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

	editProductQuantity = async (productId, cartId, quantity) => {
		try {
			const cart = await cartsModel.findOne({
				_id: new ObjectId(cartId),
			});
			if (!cart) throw new Error("Cart not found");
			const productInCart = cart.products.find(
				(product) => product.product._id == productId
			);
			if (!productInCart) throw new Error("Product not found in cart");
			productInCart.quantity = quantity;
			const updatedCart = await this.updateCart(cartId, cart.products);
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

	// delete a unit a product from cart
	deleteProductFromCart = async (productId, cartId) => {
		//get product from Model
		const product = await productModel.findOne({
			_id: new ObjectId(productId),
		});
		if (!product) throw new Error("Product not found");
		//get cart from Model
		const cart = await cartsModel.findOne({
			_id: new ObjectId(cartId),
		});
		if (!cart) throw new Error("Cart not found");
		//check if product is already in cart
		const productInCart = cart.products.find(
			(product) => product.product._id == productId
		);
		//if product is already in cart, update quantity and if quantity is 0 delete product from cart
		if (productInCart) {
			if (productInCart.quantity > 1) {
				productInCart.quantity -= 1;
			} else {
				cart.products = cart.products.filter(
					(product) => product.product._id != productId
				);
			}
			//update cart
			const updatedCart = await this.updateCart(cartId, cart.products);
			return updatedCart;
		} else {
			throw new Error("Product not found in cart");
		}
	};
}
