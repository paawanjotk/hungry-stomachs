import React, { useState } from "react";
import { getOrderById } from "../http/orders";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(undefined);
  const [orderItems, setOrderItems] = useState([]);
  const orderStatus = async () => {
    // Implement the logic to track the order
    try {
      const order = await getOrderById(orderId);

      if (order) {
        setOrderItems(order.orderItems);
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
      <div>
        {orderItems.map((item) => (
          <div key={item._id} className="flex gap-10 bg-secondary text-darkBrand p-4 rounded-lg shadow-md">
            <img className="w-[200px] rounded-md" src={item.product.imgUrl} alt="chocolate" />
            <div className="flex justify-between flex-col items-start">
              <div className="flex flex-col gap-7 items-start">
                <p className="  font-extrabold text-2xl">{item.product.name}</p>
                <p className="  ">{item.product.description}</p>
                <p className=" ">₹ {item.product.price}</p>
              </div>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      {typeof status === "string" && <p> Your order is: {status} </p>}
      {status === null && <p> No order found </p>}
    </div>
  );
};

export default TrackOrder;
