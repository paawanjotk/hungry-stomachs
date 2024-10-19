import dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export const createPaymentLink = async ({
  amount,
  customer_email,
  customer_name,
  customer_phone,
  orderId,
}: {
  amount: number;
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  orderId: string;
}) => {
  const response = await instance.paymentLink.create({
    amount,
    currency: "INR",
    customer: {
      email: customer_email,
      name: customer_name,
      contact: customer_phone,
    },
    reference_id: orderId,
    callback_url: process.env.CLIENT_URL + "/orders/processing-payment",
    description: "Payment for order at Hungry Stomachs",
  });
  console.log("Payment service ~ ", response);
  return response;
};
