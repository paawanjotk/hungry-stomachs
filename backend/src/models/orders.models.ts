import { Schema, model, Types } from "mongoose";
import {
  ORDERITEM_MODEL_NAME,
  ORDER_MODEL_NAME,
  PRODUCT_MODEL_NAME,
  USER_MODEL_NAME,
} from "../constants/models";

export interface IOrder {
  phone: string;
  address: string;
  pincode: string;
  total_price: number;
  orderItems: Types.ObjectId[];
  status?: string;
  user: Schema.Types.ObjectId;
  notes: string;
  payment_id?: string;
}

const orderSchema = new Schema<IOrder>(
  {
    phone: String,
    address: String,
    pincode: String,
    total_price: Number,
    orderItems: [{ type: Schema.Types.ObjectId, ref: ORDERITEM_MODEL_NAME }],
    status: {
      type: String,
      enum: ["pending", "confirmed", "in-transit", "completed"],
      default: "pending",
    },
    user: { type: Schema.Types.ObjectId, ref: USER_MODEL_NAME },
    notes: String,
    payment_id: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Order = model<IOrder>(ORDER_MODEL_NAME, orderSchema);

const OrderModel = {
  getById: async (id: string) => {
    const order = await Order.findById(id).populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: PRODUCT_MODEL_NAME,
      },
    });
    return order;
  },
  createOrder: async (order: IOrder) => {
    return await Order.create(order);
  },

  getOrders: async (query: Partial<IOrder>) => {
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
