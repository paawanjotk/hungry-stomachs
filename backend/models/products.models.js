import { Schema, model } from "mongoose";
import {
  CATEGORY_MODEL_NAME,
  PRODUCT_MODEL_NAME,
} from "../constants/models.js";

const productSchema = new Schema({
  imgUrl: String,
  name: { type: String, unique: true },
  price: Number,
  description: String,
  category: { type: Schema.Types.ObjectId, ref: CATEGORY_MODEL_NAME },
});

const Product = model(PRODUCT_MODEL_NAME, productSchema);

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
    return await Product.findByIdAndUpdate(id, product);
  },
  findOne: async (query) => {
    return await Product.findOne(query);
  },
};
// tu gay hay
/**
 * getAllByCategory
 * create
 * update
 */

export default ProductModel;
