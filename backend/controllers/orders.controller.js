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
    if(req.body.address!== req.user.address || req.body.phone !== req.user.phone){
      req.user.address = req.body.address;
      req.user.phone = req.body.phone;
      await req.user.save();
    }
    const response = await orderModel.createOrder({
      phone: req.body.phone,
      address: req.body.address,
      total_price: total_price,
      orderItems: orderItems.map((item) => item._id),
      user: req.user._id,
      notes: req.body.notes,
    });
    try {
      await sendMail({
        orderId: response._id,
        email: req.user.email,
        name: req.user.name,
      });
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
    return res.json({
      result: response,
    });
  },
  getOrders: async (req, res) => {
    try {
      return res.json({
        result: await orderModel.getOrders({ user: req.user._id }),
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  getBestSellers: async (req, res) => {
    try {
      const result = await OrderItemModel.getBestSellers();
      return res.json({ result });
    } catch (e) {
      return res.sendStatus(500);
    }
  },
};
export default OrderController;
