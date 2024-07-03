import productModel from "../models/products.models.js";
const ProductController = {
  getAll: (req, res) => {
    if (req.query.categoryId == undefined) {
      return res.json({
        result: productModel.getAll(),
      });
    }
    return res.json({
      result: productModel.getAllByCategory(req.query.categoryId),
    });
  },
  getById: (req, res) => {
    console.log(req.params);
    return res.json({
      result: productModel.getById(req.params.id),
    });
  },
  createProduct: async (req, res) => {
    return res.json({
      result: await productModel.createProduct(req.body),
    });
  },
  updateProduct: (req, res) => {
    return res.json({
      result: productModel.updateByIdProduct(
        req.body.productId,
        re.body.product
      ),
    });
  },
};
export default ProductController;
