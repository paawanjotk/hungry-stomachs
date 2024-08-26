import { Schema, model } from "mongoose";
import {
  ORDERITEM_MODEL_NAME,
  ORDER_MODEL_NAME,
  PRODUCT_MODEL_NAME,
  USER_MODEL_NAME,
} from "../constants/models.js";

const orderSchema = new Schema(
  {
    phone: String,
    address: String,
    total_price: Number,
    orderItems: [{ type: Schema.Types.ObjectId, ref: ORDERITEM_MODEL_NAME }],
    status: {
      type: String,
      enum: ["pending", "confirmed", "in-transit", "completed"],
      default: "pending",
    },
    user: { type: Schema.Types.ObjectId, ref: USER_MODEL_NAME },
    notes: String,
  },
  { timestamps: true }
);

const Order = model(ORDER_MODEL_NAME, orderSchema);

const OrderModel = {
  getById: async (id) => {
    const order = await Order.findById(id).populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: PRODUCT_MODEL_NAME,
      },
    });
    return order;
  },
  createOrder: async (order) => {
    return await Order.create(order);
  },

  getOrders: async (query) => {
    const orders = await Order.find(query)
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          model: PRODUCT_MODEL_NAME,
        },
      })
      .exec();
    return orders;
  },
};

export default OrderModel;
// order.findById('asdasd')
/**
 *
 * {
 *  name:"arth",
 * ph: 'asdasd,
 * address: 'asdasd',
 * items: [
 * 'a123123asdasd',
 * 'asdasdasd2q3q23sad'
 * ]
 * }
 *
 *
 */

// order.findById('asdasd').populate('OrderItem').populate('Product')
/**
 *
 * {
 *  name:"arth",
 * ph: 'asdasd,
 * address: 'asdasd',
 * items: [
 * {
 *  productId: {
 * name: asd'asd},
 *  quantity: 2
 * }
 * 'asdasdasd2q3q23sad'
 * ]
 * }
 *
 *
 */
