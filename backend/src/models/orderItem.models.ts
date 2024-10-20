import { ORDERITEM_MODEL_NAME, PRODUCT_MODEL_NAME } from "../constants/models";
import { Schema, model } from "mongoose";

export interface IOrderItem {
  product: Schema.Types.ObjectId;
  quantity: number;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: PRODUCT_MODEL_NAME },
    quantity: Number,
  },
  { timestamps: true }
);

const OrderItem = model<IOrderItem>(ORDERITEM_MODEL_NAME, orderItemSchema);

const OrderItemModel = {
  createMany: async (
    items: { _id: Schema.Types.ObjectId; quantity: number }[]
  ) => {
    return await OrderItem.insertMany(
      items.map((item) => {
        return { product: item._id, quantity: item.quantity };
      })
    );
  },
  getBestSellers: async () => {
    try {
      const topProducts = await OrderItem.aggregate([
        {
          $group: {
            _id: "$product",
            totalQuantity: { $sum: "$quantity" }, // Sum up the quantity for each product
          },
        },
        {
          $sort: { totalQuantity: -1 }, // Sort by total quantity sold in descending order
        },
        {
          $limit: 6, // Limit the result to top 5 products
        },
        {
          $lookup: {
            // Join with the Product collection to get product details
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $unwind: "$productDetails", // Unwind the product details array
        },
      ]);
      return topProducts;
    } catch (error) {
      console.error("Error getting top selling products:", error);
    }
  },
};

export default OrderItemModel;
