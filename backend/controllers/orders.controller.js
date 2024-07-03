import OrderItemModel from "../models/orderItem.models.js";
import ProductModel from "../models/products.models.js";

const OrderController = {
  
  getById: (req, res) => {
    return res.json({
      result: orderModel.getById(req.params.id)
    });
  },
  createOrder: async (req, res) => {
    
    const orderItems = await OrderItemModel.createMany(req.body.items);
    let total_price = 0;
    orderItems.forEach( async element => {
      total_price += (await ProductModel.getById(element.productId)).price * element.quantity;
    });
    return res.json({
      result:  orderModel.createOrder({ ph : req.body.ph, address : req.body.address , total_price : total_price, items : orderItems})
    });
  },
  updateOrder: (req, res) => {
    return res.json({
      result: orderModel.updateByIdOrder(req.body.orderId, re.body.order)
    });
  }
};
export default OrderController;