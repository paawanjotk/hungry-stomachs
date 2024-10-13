import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductsById } from "../http/products";
import { createOrder } from "../http/orders";

const Ship = () => {
  const location = useLocation();
  const { cart } = location.state || {};
  const { items, address, PIN, phone, notes, total } = cart || {};
  const [fetchedItems, setFetchedItems] = useState([]);
  const onSubmit = async () => {
    try {
      if (!localStorage.getItem("token")) {
        alert("Please login to place an order");
        return;
      }
      const res = await createOrder(cart, localStorage.getItem("token"));
      window.open(res.paymentLink, "_blank").focus();
    } catch (e) {
      alert("Error while placing the order");
      console.error(e);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const fetchItems = await Promise.all(
          items.map(async (item) => {
            let product = await getProductsById(item._id);
            product.quantity = item.quantity;
            return product;
          })
        );
        setFetchedItems(fetchItems);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const calculateShippingCost = (PIN, total) => {
    if (total > 2000) {
      return `Shipping is free for orders above 2000 rupees.`;
    }
    if (PIN === 302004) {
      return `Shipping is free at your location.`;
    }
    return "The shipping cost may vary between 50-250 rupees (depending upon weight). We will contact you separately to pay the shipping cost.";
  };

  return (
    <div className="flex flex-col  items-center gap-6 p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl text-darkBrand font-bold">
        Your Pretty Order Confirmation
      </h1>
      <h2 className="text-lg md:text-2xl font-medium">Your order details:</h2>
      <div className="flex flex-col gap-5 w-[90%] md:w-[90%] bg-secondary p-5 border-2 border-primary">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg md:text-2xl font-medium">Items:</h3>
          <ul className="list-disc list-inside">
            {fetchedItems.map((item, idx) => (
              <li key={idx} className="text-lg md:text-2xl font-medium">
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
        <h2 className="text-lg md:text-2xl font-medium">
          Address: <span className="font-normal">{address}</span>
        </h2>
        <h2 className="text-lg md:text-2xl font-medium">
          {" "}
          PIN: <span className="font-normal">{PIN}</span>
        </h2>
        <h2 className="text-lg md:text-2xl font-medium">
          Phone: <span className="font-normal">{phone}</span>{" "}
        </h2>
        {notes && (
          <h2 className="text-lg md:text-2xl font-medium">
            Notes: <span className="font-normal">{notes}</span>
          </h2>
        )}
        <h2 className="text-lg md:text-2xl font-medium">
          Your order total is <span className="font-normal">₹{total}</span>
        </h2>
        <h2 className="text-lg md:text-2xl font-medium">
          Shipping:{" "}
          <span className="font-normal">
            {calculateShippingCost(PIN, total)} Packages are generally
            dispatched within 2 days and take 2-3 working days to reach you.
          </span>
        </h2>
        <p>
          You may also arrange for a pick-up from our location in PIN code
          302004 Raja Park, Jaipur.
        </p>
        <p>
          For any doubt message us here:
          <a
            className="font-bold text-sky-600 hover:underline ml-1"
            href="https://wa.me/918283830983/?text=Hello,+I+am+placing+an+order, can you help me?"
            target="_blank"
            rel="noopener noreferrer"
          >
            Whatsapp
          </a>
        </p>
      </div>
      <button
        onClick={onSubmit}
        className=" bg-primary text-white text-xl py-3 px-6 rounded-lg hover:bg-primary/80 transition duration-300 ease-in-out "
      >
        Pay Now
      </button>
      <p>(Verified Razorpay Business)</p>
    </div>
  );
};

export default Ship;
