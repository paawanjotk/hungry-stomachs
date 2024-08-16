import { Schema, model } from "mongoose";
import { CATEGORY_MODEL_NAME } from "../constants/models.js";

const categorySchema = new Schema({
  imgUrl: String,
  name: { type: String, unique: true },
  description: String,
});

const Category = model(CATEGORY_MODEL_NAME, categorySchema);

// const categories = [
//   {
//     id: 1,
//     name: "donuts",
//   },
//   {
//     id: 2,
//     name: "truffles",
//   },
// ];

const CategoriesModel = {
  getAll: async () => {
    return await Category.find();
  },
  createCategory: async (category) => {
    return await Category.create(category);
  },
  getById: async (id) => {
    return await Category.findById(id);
  },
  findOne: async (query) => {
    return await Category.findOne(query);
  },
};

export default CategoriesModel;
