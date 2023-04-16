import CartsManager from "../controllers/carts.js";
import { Router } from "express";

const router = Router();
const cartsManager = new CartsManager();

router.post("/", async (req, res) => {
	const result = await cartsManager.addCart();
	res.send({ status: "Cart added", result: result });
});

router.get("/", async (req, res) => {
	const result = await cartsManager.getCarts();
	res.send({ status: "Success", result: result });
});

router.get("/:cid", async (req, res) => {
	let cartId = parseInt(req.params.cid);

	const result = await cartsManager.getCartById(cartId);
	return res.send(result);
});

router.put("/:cid/product/:pid", async (req, res) => {
	const productId = parseInt(req.params.pid);
	const cartId = parseInt(req.params.cid);
	const result = await cartsManager.addProductToCart(productId, cartId);
	res.send(result);
});

export default router;
