import productModel, { IProduct } from "../models/products.models";
import categoryModel, { ICategory } from "../models/categories.models";
import { Request, Response } from "express";

const ProductController = {
  getAll: async (req: Request, res: Response): Promise<void> => {
    const result: { products?: IProduct[]; category?: ICategory | null } = {};
    try {
      if (req.query.categoryId == undefined) {
        result.products = await productModel.getAll();
      } else {
        result.products = await productModel.getAllByCategory(
          req.query.categoryId as string
        );
        result.category = await categoryModel.getById(
          req.query.categoryId as string
        );
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
      return;
    }

    res.json({ result });
  },
  getById: async (req: Request, res: Response): Promise<void> => {
    res.json({
      result: await productModel.getById(req.params.id),
    });
  },
  createProduct: async (req: Request, res: Response): Promise<void> => {
    res.json({
      result: await productModel.createProduct(req.body),
    });
  },
  updateProduct: async (req: Request, res: Response): Promise<void> => {
    res.json({
      result: await productModel.updateByIdProduct(
        req.body.productId,
        req.body.product
      ),
    });
  },
};
export default ProductController;
