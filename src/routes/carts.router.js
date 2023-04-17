import CartsManager from "../controllers/carts.js";
import { Router } from "express";

const router = Router();
const cartsManager = new CartsManager();

router.post("/", async (req, res) => {
	const result = await cartsManager.addCart();
	res.send({ status: "Cart added", result });
});

router.get("/", async (req, res) => {
	const result = await cartsManager.getCarts();
	res.send({ status: "Success", result });
});

router.get("/:cid", async (req, res) => {
	const cartId = req.params.cid;
	const result = await cartsManager.getCartById(cartId);
	return res.send({ status: "Success", result });
});

router.post("/:cid/product/:pid", async (req, res) => {
	const cartId = req.params.cid;
	const productId = req.params.pid;
	const result = await cartsManager.addProductToCart(productId, cartId);
	res.send({ status: "Success", result });
	// res.render("carts", { status: "Success", result });
});

router.put("/:cid", async (req, res) => {
	const cartId = req.params.cid;
	const products = req.body.products;
	const result = await cartsManager.updateCart(cartId, products);
	res.send({ status: "Success", result });
});

router.delete("/:cid/product/:pid", async (req, res) => {
	const cartId = req.params.cid;
	const productId = req.params.pid;
	const result = await cartsManager.deleteProductFromCart(productId, cartId);
	res.send({ status: "Success", result });
});

router.delete("/:cid", async (req, res) => {
	const cartId = req.params.cid;
	const result = await cartsManager.deleteCart(cartId);
	res.send({ status: "Success", result });
});

export default router;
