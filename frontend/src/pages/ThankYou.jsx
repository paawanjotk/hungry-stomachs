import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaListUl } from 'react-icons/fa';
import { setLocalCart } from "../storage";

const ThankYou = () => {
  const { orderId } = useParams();
  setLocalCart([]);
  return (
    <div className="flex flex-col justify-center items-center gap-6 p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-primary text-3xl md:text-4xl font-bold text-center">
        Thanks for placing a fantastic order!
      </h1>
      <h2 className="text-black text-lg md:text-2xl font-medium text-center">
        Your order id is: <span className="font-bold">{orderId}</span>.
      </h2>
      <h2 className="text-lg md:text-xl font-bold text-center">
        We have received your order and will contact you as soon as possible.
      </h2>
      <h3 className="text-xl md:text-xl text-center">
        In case of any queries or special requests about your order, you can contact the chef Inderpreet Kaur here on :
        <a
          className="font-bold text-sky-600 hover:underline ml-1"
          href="https://wa.me/918283830983/?text=Hello,+I+just+placed+an+order!"
          target="_blank"
          rel="noopener noreferrer"
        >
          Whatsapp
        </a>
      </h3>
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
        <Link to="/track">
          <button className="bg-[#8B4513] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#8B4513]/80 transition duration-300 ease-in-out flex items-center justify-center">
            <FaMapMarkerAlt className="mr-2" /> Track Your Order
          </button>
        </Link>
        <Link to="/orders">
          <button className="bg-[#D2691E] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#D2691E]/80 transition duration-300 ease-in-out flex items-center justify-center">
            <FaListUl className="mr-2" /> View Your Orders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
