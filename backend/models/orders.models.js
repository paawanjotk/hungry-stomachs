import { Schema, model } from "mongoose";
import { ORDERITEM_MODEL_NAME, ORDER_MODEL_NAME} from "../constants/models.js";

const orderSchema = new Schema({
  ph: String,
  address: String,
  total_price : Number,
  orderItems: [{type: Schema.Types.ObjectId, ref: ORDERITEM_MODEL_NAME}]
});

const Order =  model(ORDER_MODEL_NAME, orderSchema);

const OrderModel = {
  getById: async(id) => {
    const order = await Order.findById(id);
    return order;
  },
  
  createOrder: async(order) => {
    await Order.create(order);
  },
  updateByIdOrder: async(id, order) => {
    await Order.findByIdAndUpdate(id, order);
  },
};
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