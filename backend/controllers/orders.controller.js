import OrderItemModel from "../models/orderItem.models.js";
import ProductModel from "../models/products.models.js";
import orderModel from "../models/orders.models.js";
import { sendMail } from "../services/mail.js";
import { createPaymentLink, instance } from "../services/payment.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

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
    if (
      req.body.address !== req.user.address ||
      req.body.phone !== req.user.phone
    ) {
      req.user.address = req.body.address;
      req.user.phone = req.body.phone;
      await req.user.save();
    }
    const response = await orderModel.createOrder({
      phone: req.body.phone,
      address: req.body.address,
      pincode: req.body.PIN,
      total_price: total_price,
      orderItems: orderItems.map((item) => item._id),
      user: req.user._id,
      notes: req.body.notes,
    });
    try {
      const shortUrlObject = await createPaymentLink({
        amount: total_price * 100,
        customer_email: req.user.email,
        customer_name: req.user.name,
        customer_phone: req.body.phone,
        orderId: response._id,
      });
      response.razorpay_payment_link_id = shortUrlObject.razorpay_payment_id;
      await response.save();
      return res.json({
        result: { ...response, paymentLink: shortUrlObject.short_url },
      });
    } catch (error) {
      console.log(e);
      return res.sendStatus(500);
    }
    // try {
    //   await sendMail({
    //     orderId: response._id,
    //     email: req.user.email,
    //     name: req.user.name,
    //   });
    // } catch (e) {
    //   console.error(e);
    //   return res.sendStatus(500);
    // }
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
  processPayment: async (req, res) => {
    try {
      console.log("Processing payment ~ ", req.query);
      const {
        razorpay_payment_link_reference_id,
        razorpay_payment_link_id,
        razorpay_payment_id,
        razorpay_signature,
        razorpay_payment_link_status,
      } = req.query; // Access directly from req.query

      // Get the order by reference ID
      const order = await orderModel.getById(
        razorpay_payment_link_reference_id
      );
      if (!order) {
        return res.sendStatus(404);
      }
      if (order.status !== "pending") {
        return res.sendStatus(400);
      }
      if (razorpay_payment_link_status !== "paid") {
        return res
          .status(200)
          .json({ redirectUrl: process.env.CLIENT_URL + "/order-cancelled" });
      }

      // Define the payment verification data

      const paymentData = {
        payment_link_id: razorpay_payment_link_id,
        payment_id: razorpay_payment_id,
        payment_link_reference_id: razorpay_payment_link_reference_id,
        payment_link_status: razorpay_payment_link_status,
      };
      // Verify the payment status

      try {
        validatePaymentVerification(
          paymentData,
          razorpay_signature,
          instance.key_secret
        );
        console.log("Payment verification successful");

        // Update the order status to confirmed
        order.status = "confirmed";
        order.payment_id = razorpay_payment_id;
        await order.save();

        // Send the success response
        return res.status(200).json({
          redirectUrl: process.env.CLIENT_URL + "/order-placed/" + order._id,
        });
      } catch (error) {
        console.error("Payment verification failed:", error);
        console.error("Payment verification failed");
        console.error(error);
        return res.status(200).json({
          redirectUrl: process.env.CLIENT_URL + "/order-cancelled",
        });
      }
    } catch (e) {
      console.error(e);
      return res.status(200).json({
        redirectUrl: process.env.CLIENT_URL + "/order-cancelled",
      });
    }
  },
};
export default OrderController;
