import { productModel } from "../models/products.model.js";

export default class ProductManager {
	constructor() {}

	getProducts = async () => {
		try {
			const products = await productModel.find();
			return products;
		} catch (error) {
			console.log(error);
		}
	};

	addProduct = async (product) => {
		try {
			const result = await productModel.create(product);
			return result;
		} catch (error) {
			console.log(error);
		}
	};

	getProductById = async (productId) => {
		try {
			const result = await productModel.find({ _id: productId }).lean();
			return result;
		} catch (error) {
			console.log(error);
		}
	};

	addManyProducts = async (arrOfProducts) => {
		try {
			const result = await productModel.insertMany(arrOfProducts);
			return result;
		} catch (error) {
			console.log(error);
		}
	};

	updateProduct = async (productId, product) => {};

	deleteProduct = async (productId) => {};
}
