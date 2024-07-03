import { Schema, get, model } from "mongoose";
import {
  CATEGORY_MODEL_NAME,
  PRODUCT_MODEL_NAME,
} from "../constants/models.js";

const productSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  category: { type: Schema.Types.ObjectId, ref: CATEGORY_MODEL_NAME },
});

const Product = model(PRODUCT_MODEL_NAME, productSchema);

const products = [
  {
    id: 1,
    categoryId: 1,
    name: "Chocolate donut",
  },
  {
    id: 2,
    categoryId: 1,
    name: "Midnight donut",
  },
  {
    id: 3,
    categoryId: 1,
    name: "White donut",
  },
  {
    id: 4,
    categoryId: 2,
    name: "Chocolate truffle",
  },
];

const ProductModel = {
  getAll: async () => {
    const products = await Product.find();
    return products;
  },
  getById: async (id) => {
    const product = await Product.findById(id);
    return product;
  },
  getAllByCategory: async (categoryId) => {
    const products = await Product.find({ category: categoryId });
    return products;
  },
  createProduct: async (product) => {
    return await Product.create(product);
  },
  updateByIdProduct: async (id, product) => {
    await Product.findByIdAndUpdate(id, product);
  },
};
// tu gay hay
/**
 * getAllByCategory
 * create
 * update
 */

export default ProductModel;
