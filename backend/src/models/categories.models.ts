import { Schema, model } from "mongoose";
import { CATEGORY_MODEL_NAME } from "../constants/models";

export interface ICategory {
  imgUrl: string;
  name: string;
  description: string;
}

const categorySchema = new Schema<ICategory>({
  imgUrl: String,
  name: { type: String, unique: true },
  description: String,
});

const Category = model<ICategory>(CATEGORY_MODEL_NAME, categorySchema);

const CategoriesModel = {
  getAll: async () => {
    return await Category.find();
  },
  createCategory: async (category: ICategory) => {
    return await Category.create(category);
  },
  getById: async (id: string) => {
    return await Category.findById(id);
  },
  findOne: async (query: Partial<ICategory>) => {
    return await Category.findOne(query);
  },
};

export default CategoriesModel;
