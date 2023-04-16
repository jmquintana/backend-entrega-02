import { Router } from "express";
import ProductManager from "../controllers/products.js";
import { productModel } from "../models/products.model.js";

// const productManager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
	const products = await productModel.find().lean();
	res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
	// const products = await productManager.getProducts();
	const products = await productModel.find().lean();
	res.render("realTimeProducts", { products });
});

export default router;
