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

// update product quantity in cart
router.put("/:cid", async (req, res) => {
	const cartId = req.params.cid;
	const productId = req.body.productId;
	const newQuantity = req.body.newQuantity;
	const result = await cartsManager.editProductQuantity(
		productId,
		cartId,
		newQuantity
	);
	res.send({ status: "Success", result });
});

router.get("/cart/:cid", async (req, res) => {
	const cartId = req.params.cid;
	// const carts = carts[0];
	const cart = await cartsManager.getCartById(cartId);
	if (cart) {
		const cartIsEmpty = !cart.products?.length;
		const { products } = cart;

		// Calculate sub total price of each product
		products.forEach((product) => {
			product.subTotal = product.product.price * product.quantity;
		});
		// Calculate total price of all products
		const totalPrice = products.reduce((acc, product) => {
			return acc + parseFloat(product.subTotal);
		}, 0);
		res.render("cart", { cart, cartId, cartIsEmpty, products, totalPrice });
	}
});

export default router;
