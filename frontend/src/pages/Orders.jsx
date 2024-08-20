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
    return <h1>Error: {error}</h1>;
  }

  if (orders === undefined) {
    return <h1>Loading..</h1>;
  }
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-black text-4xl font-bold">Your Orders</h1>
      <div>
        {orders.map((order) => {
          return (
            <div className="flex flex-col items-center gap-4 rounded-xl p-2 bg-darkBrand/15  mb-10">
              <h2 className="  font-medium text-2xl ">Order Id: {order._id}</h2>
              <p className=" text-lg">Order placed on: {new Date(order.createdAt).toISOString().split('T')[0]}</p>
              <div className="grid  grid-cols-2 gap-4  p-3">
                {order.orderItems.map((orderItem) => {
                  const { imgUrl, name, price } = orderItem.product;
                  return (
                    <div className="flex bg-secondary max-w-[400px] text-darkBrand p-4 gap-3  shadow-md">
                      <div className="relative min-w-[100px]  rounded-lg bg-gray-200 overflow-hidden">
                        <img
                          src={imgUrl}
                          alt="chocolate"
                          className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex justify-between flex-col items-start">
                        <div className="flex flex-col gap-4 items-start">
                          <p className="  font-extrabold text-xl">{name}</p>
                          <p className=" ">₹ {price}</p>
                          <p className=" ">Quantity: {orderItem.quantity}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="  font-medium text-lg">
                {" "}
                Order items total: ₹ {order.total_price}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
