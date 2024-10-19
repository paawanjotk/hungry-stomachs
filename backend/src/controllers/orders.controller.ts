import OrderItemModel from "../models/orderItem.models";
import ProductModel from "../models/products.models";
import orderModel from "../models/orders.models";
import { sendMail } from "../services/mail";
import { createPaymentLink } from "../services/payment";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { Request, Response } from "express";

const OrderController = {
  getById: async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await orderModel.getById(req.params.id);
      res.json({ result });
    } catch (e) {
      res.sendStatus(500);
    }
  },
  createOrder: async (req: Request, res: Response): Promise<void> => {
    const orderItems = await OrderItemModel.createMany(req.body.items);
    const body = req.body as {
      phone: string;
      address: string;
      PIN: string;
      items: { _id: string; quantity: number }[];
      notes: string;
    };

    let total_price = 0;
    for (const element of req.body.items) {
      const prod = await ProductModel.getById(element._id);
      if (prod && prod.price != null) {
        total_price += prod.price * element.quantity;
      }
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
      phone: body.phone,
      address: body.address,
      pincode: body.PIN,
      total_price: total_price,
      orderItems: orderItems.map((item) => item._id),
      user: req.user._id,
      notes: body.notes,
    });
    try {
      const shortUrlObject = await createPaymentLink({
        amount: total_price * 100,
        customer_email: req.user.email,
        customer_name: req.user.name,
        customer_phone: req.body.phone,
        orderId: response._id.toString(),
      });
      await response.save();
      res.json({
        result: { ...response, paymentLink: shortUrlObject.short_url },
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
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
  getOrders: async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({
        result: await orderModel.getOrders({ user: req.user._id }),
      });
    } catch (error) {
      res.sendStatus(500);
    }
  },
  getBestSellers: async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await OrderItemModel.getBestSellers();
      res.json({ result });
    } catch (e) {
      res.sendStatus(500);
    }
  },
  processPayment: async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        razorpay_payment_link_reference_id,
        razorpay_payment_link_id,
        razorpay_payment_id,
        razorpay_signature,
        razorpay_payment_link_status,
      } = req.query as {
        razorpay_payment_link_reference_id: string;
        razorpay_payment_link_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
        razorpay_payment_link_status: string;
      };

      const order = await orderModel.getById(
        razorpay_payment_link_reference_id
      );
      if (!order) {
        res.sendStatus(404);
        return;
      }
      if (order.status !== "pending") {
        res.sendStatus(400);
      }
      if (razorpay_payment_link_status !== "paid") {
        res
          .status(200)
          .json({ redirectUrl: process.env.CLIENT_URL + "/order-cancelled" });
      }

      const paymentData = {
        payment_link_id: razorpay_payment_link_id,
        payment_id: razorpay_payment_id,
        payment_link_reference_id: razorpay_payment_link_reference_id,
        payment_link_status: razorpay_payment_link_status,
      };

      try {
        validatePaymentVerification(
          paymentData,
          razorpay_signature,
          process.env.RAZORPAY_KEY_SECRET || ""
        );

        order.status = "confirmed";
        order.payment_id = razorpay_payment_id;

        try {
          await sendMail({
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
          });
        } catch (e) {
          console.error(e);
        }

        await order.save();

        res.status(200).json({
          redirectUrl: process.env.CLIENT_URL + "/order-placed/" + order._id,
        });
      } catch (error) {
        console.error("Payment verification failed:", error);
        console.error("Payment verification failed");
        console.error(error);
        res.status(200).json({
          redirectUrl: process.env.CLIENT_URL + "/order-cancelled",
        });
      }
    } catch (e) {
      console.error(e);
      res.status(200).json({
        redirectUrl: process.env.CLIENT_URL + "/order-cancelled",
      });
    }
  },
};
export default OrderController;
