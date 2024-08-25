import React, { useEffect, useState } from "react";
import { getOrders } from "../http/orders";

const Orders = () => {
  const [orders, setOrders] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const orders = await getOrders();
        setOrders(orders);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  if (error) {
    return <h1 className="text-center text-red-600">Error: {error}</h1>;
  }

  if (orders === undefined) {
    return <h1 className="text-center text-gray-600">Loading..</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5 p-4">
      <h1 className="text-black text-4xl font-bold text-center">Your Orders</h1>
      <div className="w-full max-w-4xl">
        {orders.map((order) => {
          return (
            <div
              key={order._id}
              className="flex flex-col items-center gap-4 rounded-xl p-4 bg-darkBrand/15 mb-10 shadow-md"
            >
              <h2 className="font-medium text-2xl">Order Id: {order._id}</h2>
              <p className="text-lg">Order placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-lg">Delivery address: {order.address}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 w-full">
                {order.orderItems.map((orderItem) => {
                  const { imgUrl, name, price } = orderItem.product;
                  return (
                    <div
                      key={name}
                      className="flex flex-col sm:flex-row bg-secondary max-w-full text-darkBrand p-4 gap-3 shadow-md"
                    >
                      <div className="relative w-full sm:w-1/3 min-w-[100px] rounded-lg bg-gray-200 overflow-hidden">
                        <img
                          src={imgUrl}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-grow p-2">
                        <p className="font-extrabold text-lg">{name}</p>
                        <p className="text-lg">₹ {price}</p>
                        <p className="text-lg">Quantity: {orderItem.quantity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-medium text-lg">Order items total: ₹ {order.total_price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
