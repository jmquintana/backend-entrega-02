import { Router } from "express";
import ProductManager from "../controllers/products.js";
import { productModel } from "../models/products.model.js";

// const productManager = new ProductManager();
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

router.get("/realtimeproducts", async (req, res) => {
	const products = await productModel.find().lean();
	res.render("realTimeProducts", { products });
});

export default router;
