import React, { useState } from "react";
import { getOrderById } from "../http/orders";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(undefined);
  const orderStatus = async () => {
    // Implement the logic to track the order
    try {
      const order = await getOrderById(orderId);

      if (order) {
        setStatus(order.status);
      } else {
        setStatus(null);
      }
    } catch (e) {
      setStatus(null);
    }
  };

  return (
    <div className="flex justify-center  items-center flex-col gap-8">
      <h1 className="text-4xl font-bold text-center">Track Order</h1>
      <h1 className="text-lg text-center">
        Enter your Order ID to track your order
      </h1>
      <input
        className="border-2 p-2 rounded-md"
        value={orderId}
        onChange={(e) => {
          setOrderId(e.target.value);
        }}
        type="text"
        placeholder="Enter Order ID"
      />
      <button className="bg-secondary border-2 p-2 rounded-md " onClick={orderStatus}>Track</button>
      {typeof status === "string" && <p> Your order is: {status} </p>}
      {status === null && <p> No order found </p>}
    </div>
  );
};

export default TrackOrder;
