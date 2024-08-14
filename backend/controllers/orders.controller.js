import OrderItemModel from "../models/orderItem.models.js";
import ProductModel from "../models/products.models.js";
import orderModel from "../models/orders.models.js";
import { sendMail } from "../services/mail.js";

const OrderController = {
  getById: async (req, res) => {
    try {
      const result = await orderModel.getById(req.params.id);
      return res.json({ result });
    } catch (e) {
      return res.sendStatus(500);
    }
  },
  createOrder: async (req, res) => {
    const orderItems = await OrderItemModel.createMany(req.body.items);

    let total_price = 0;
    for (const element of req.body.items) {
      const prod = await ProductModel.getById(element._id);
      total_price += prod.price * element.quantity;
    }
    const response = await orderModel.createOrder({
      ph: req.body.ph,
      address: req.body.address,
      total_price: total_price,
      orderItems: orderItems.map((item) => item._id),
      name: req.body.name,
      email: req.body.email,
    });
    try {
      await sendMail({
        orderId: response._id,
        email: req.body.email,
        name: req.body.name,
      });
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
    return res.json({
      result: response,
    });
  },
  updateOrder: async (req, res) => {
    return res.json({
      result: await orderModel.updateByIdOrder(req.body.orderId, re.body.order),
    });
  },
};
export default OrderController;
