import productModel from "../models/products.models.js";
import categoryModel from "../models/categories.models.js";

const ProductController = {
  getAll: async (req, res) => {
    const result = {};
    try {
      if (req.query.categoryId == undefined) {
        result.products = await productModel.getAll();
      } else {
        result.products = await productModel.getAllByCategory(
          req.query.categoryId
        );
        result.category = await categoryModel.getById(req.query.categoryId);
      }
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }

    return res.json({ result });
  },
  getById: async (req, res) => {
    return res.json({
      result: await productModel.getById(req.params.id),
    });
  },
  createProduct: async (req, res) => {
    return res.json({
      result: await productModel.createProduct(req.body),
    });
  },
  updateProduct: async (req, res) => {
    return res.json({
      result: await productModel.updateByIdProduct(
        req.body.productId,
        re.body.product
      ),
    });
  },
};
export default ProductController;
