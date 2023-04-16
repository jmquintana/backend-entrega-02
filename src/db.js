import mongoose from "mongoose";
import config from "./config.js";

const { DB_USER, DB_PASS, DB_NAME } = config;

const database = {
	connect: async () => {
		try {
			await mongoose.connect(
				`mongodb+srv://${DB_USER}:${DB_PASS}@codercluster.tgft5r9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
			);
			console.log("Database connected");
		} catch (error) {
			console.log(error);
		}
	},
};

export default database;
