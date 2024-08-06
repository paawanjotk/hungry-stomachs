import {
  ORDERITEM_MODEL_NAME,
  PRODUCT_MODEL_NAME,
} from "../constants/models.js";
import { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, PRODUCT_MODEL_NAME },
  quantity: Number,
});

const OrderItem = model(ORDERITEM_MODEL_NAME, orderItemSchema);

const OrderItemModel = {
  createMany: async (items) => {
    return await Promise.all(
      items.map((item) => {
        return OrderItem.create({
          product: item._id,
          quantity: item.quantity,
        });
      })
    );
  },
};

export default OrderItemModel;
