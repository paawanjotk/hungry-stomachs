import { config } from "dotenv";
config();
import express from "express";
import CategoriesController from "./controllers/categories.controller.js";
import ProductController from "./controllers/products.controller.js";
import OrderController from "./controllers/orders.controller.js";
import mongoose from "mongoose";
import UserController from "./controllers/users.controller.js";
import cors from "cors";

const App = express();
App.use(cors({ origin: process.env.CLIENT_URL }));
App.use(express.json());
App.get("/", (req, res) => {
  console.log(req.query);
  res.json({ message: "hello" });
});

App.get("/categories", CategoriesController.get);
App.get("/products", ProductController.getAll);
App.get("/products/:id", ProductController.getById);
App.post("/products", ProductController.createProduct);
App.put("/products", ProductController.updateProduct);
App.get("/orders/:id", OrderController.getById);
App.post("/orders", OrderController.createOrder);
App.put("/orders/:id", OrderController.updateOrder);
App.post("/categories", CategoriesController.post);
App.post("/sign-up", UserController.createUser);
App.post("/sign-in", UserController.LoginUserByEmail);

const main = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/hungry-stomachs")
    .then(() => {
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
