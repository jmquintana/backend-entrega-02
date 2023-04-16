import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";
import database from "./db.js";
import socket from "./socket.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";

// Initialization
const app = express();
const PORT = 8080;

// Settings
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(`${__dirname}/public`));
app.use(morgan("dev"));

// Database connection
database.connect();

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, (req, res) => {
	console.log(`Server listening on port ${PORT}`);
});

// Websocket Server
socket.connect(httpServer);
