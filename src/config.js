import dotenv from "dotenv";
dotenv.config();

const config = {
	DB_NAME: process.env.DB_NAME,
	DB_USER: process.env.DB_USER,
	DB_PASS: process.env.DB_PASS,
};

export default config;
