import { Router } from "express";
import { productModel } from "../models/products.model.js";
import ProductManager from "../controllers/products.js";
import CartsManager from "../controllers/carts.js";

const cartsManager = new CartsManager();
const productsManager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
	const { page = 1, limit = 5 } = req.query;
	const {
		docs: products,
		hasPrevPage,
		hasNextPage,
		prevPage,
		nextPage,
		totalDocs,
		totalPages,
	} = await productModel.paginate(
		{},
		{
			page,
			limit,
			lean: true,
		}
	);

	return res.render("products", {
		products,
		page,
		hasPrevPage,
		hasNextPage,
		prevPage,
		nextPage,
		totalDocs,
		totalPages,
	});
});

router.post("/:cid/product/:pid", async (req, res) => {
	const cartId = req.params.cid;
	const productId = req.params.pid;
	const result = await cartsManager.addProductToCart(productId, cartId);
	res.render("carts", { status: "Success", result });
});

router.get("/realtimeproducts", async (req, res) => {
	const products = await productModel.find().lean();
	res.render("realTimeProducts", { products });
});

router.get("/product/:pid", async (req, res) => {
	const productId = req.params.pid;
	const product = await productsManager.getProductById(productId);
	res.render("product", product[0]);
});

router.get("/cart/:cid", async (req, res) => {
	const cartId = req.params.cid;
	// const carts = carts[0];
	const cart = await cartsManager.getCartById(cartId);
	console.log(cart);
	const cartIsEmpty = !cart.products.length;
	const { products } = cart;
	console.log(cartIsEmpty);
	res.render("cart", { cart, cartId, cartIsEmpty, products });
});

export default router;
