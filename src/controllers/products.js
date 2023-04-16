import { productModel } from "../models/products.model";

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
		} catch (error) {
			console.log(error);
		}
	};
}
