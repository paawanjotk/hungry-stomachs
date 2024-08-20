import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaListUl } from 'react-icons/fa';

const ThankYou = () => {
  const { orderId } = useParams();
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-4">
      <h1 className="text-primary text-4xl font-bold">
        Thanks for placing a fantastic order!
      </h1>
      <h1 className="text-black text-2xl font-medium">
        {" "}
        Your order id is: {orderId}.{" "}
      </h1>{" "}
      <h2 className="text-black text-xl font-bold">
        {" "}
        We have received your order and will contact you as soon as possible.{" "}
      </h2>{" "}
      <h2 className="text-lg">
        In case of any queries or special requests about your order, you can
        contact us here:{" "}
        <span>
          <a
            className="font-bold text-sky-950"
            href="https://wa.me/918283830983/?text=Hello,+I+just+placed+an+order!+"
          >
            Whatsapp
          </a>
        </span>{" "}
      </h2>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/track">
          <button className="bg-[#8B4513] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#8B4513]/80 transition duration-300 ease-in-out flex items-center justify-center">
          <FaMapMarkerAlt className="mr-2" /> Track Your Order Here
          </button>
        </Link>
        <Link to="/orders">
          <button className="bg-[#D2691E] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#D2691E]/80 transition duration-300 ease-in-out flex items-center justify-center">
          <FaListUl className="mr-2" /> View Your Orders Here
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
