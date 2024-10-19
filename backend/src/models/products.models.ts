import { Schema, model } from "mongoose";
import { CATEGORY_MODEL_NAME, PRODUCT_MODEL_NAME } from "../constants/models";

export interface IProduct {
  imgUrl: string;
  name: string;
  price: number;
  description: string;
  category: Schema.Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
  imgUrl: String,
  name: { type: String, unique: true },
  price: Number,
  description: String,
  category: { type: Schema.Types.ObjectId, ref: CATEGORY_MODEL_NAME },
});

const Product = model<IProduct>(PRODUCT_MODEL_NAME, productSchema);

const ProductModel = {
  getAll: async () => {
    const products = await Product.find();
    return products;
  },
  getById: async (id: string) => {
    const product = await Product.findById(id);
    return product;
  },
  getAllByCategory: async (categoryId: string) => {
    const products = await Product.find({ category: categoryId });
    return products;
  },
  createProduct: async (product: IProduct) => {
    return await Product.create(product);
  },
  updateByIdProduct: async (id: string, product: Partial<IProduct>) => {
    return await Product.findByIdAndUpdate(id, product);
  },
  findOne: async (query: Partial<IProduct>) => {
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
