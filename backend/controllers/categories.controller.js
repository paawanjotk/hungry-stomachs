import CategoriesModel from "../models/categories.models.js";

const CategoriesController = {
  get: async (req, res) => {
    res.json({ result: await CategoriesModel.getAll() });
  },
  post: async (req, res) => {
    res.json({ result: await CategoriesModel.createCategory(req.body) });
  },
};
export default CategoriesController;
