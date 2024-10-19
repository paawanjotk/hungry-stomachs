import dotenv from "dotenv";
dotenv.config();

import express from "express";
import CategoriesController from "./controllers/categories.controller";
import ProductController from "./controllers/products.controller";
import OrderController from "./controllers/orders.controller";
import mongoose from "mongoose";
import UserController, {
  authenticateJwt,
} from "./controllers/users.controller";
import cors from "cors";

const App = express();
App.use(cors({ origin: process.env.CLIENT_URL }));
App.use(express.json());
App.get("/", (req, res) => {
  console.log(req.query);
  res.json({ message: "hello" });
});

App.get("/categories", CategoriesController.get);
App.post("/categories", CategoriesController.post);

App.get("/products", ProductController.getAll);
App.get("/products/:id", ProductController.getById);
App.post("/products", ProductController.createProduct);
App.put("/products", ProductController.updateProduct);

App.post("/orders", authenticateJwt, OrderController.createOrder);
App.get("/orders/bestsellers", OrderController.getBestSellers);
App.get("/orders/", authenticateJwt, OrderController.getOrders);
App.get(
  "/orders/processing-payment",
  authenticateJwt,
  OrderController.processPayment
);
App.get("/orders/:id", OrderController.getById);

App.post("/sign-up", UserController.createUser);
App.post("/sign-in", UserController.loginUser);
App.get("/user", authenticateJwt, UserController.getUser);
App.put("/user", authenticateJwt, UserController.updateUser);

const main = async () => {
  console.log({ connection_string: process.env.MONGO_DB_URL });
  const mongoDbUrl = process.env.MONGO_DB_URL;
  if (!mongoDbUrl) {
    throw new Error("MONGO_DB_URL is not defined in the environment variables");
  }
  await mongoose.connect(mongoDbUrl).then(() => {
    console.log("Connected to DB");
  });
};

main()
  .then(() => {
    App.listen(8000, () => {
      console.log("Server started at 8000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
