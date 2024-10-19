import { Request, Response } from "express";
import CategoriesModel from "../models/categories.models";

const CategoriesController = {
  get: async (_: Request, res: Response) => {
    res.json({ result: await CategoriesModel.getAll() });
  },
  post: async (req: Request, res: Response) => {
    res.json({ result: await CategoriesModel.createCategory(req.body) });
  },
};
export default CategoriesController;
