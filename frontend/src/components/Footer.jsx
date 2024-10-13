import React from "react";
import fssai from './fssai.png';
const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-100 py-6 border-t border-gray-300">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="text-sm text-gray-700">
            &copy; 2024 Hungry Stomachs- A Chocolate Shop. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-gray-600">
            <a href="https://merchant.razorpay.com/policy/OpaF1luRghZoKW/refund" className="text-blue-500 hover:underline">
              Cancellation & Refund Policy
            </a>{" "}
            |
            {" "}
            <a href="https://merchant.razorpay.com/policy/OpaF1luRghZoKW/terms" className="text-blue-500 hover:underline">
              Terms & Conditions
            </a> {" "}
            |
            {" "}
            <a href="https://merchant.razorpay.com/policy/OpaF1luRghZoKW/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
            <img src = {fssai} alt="FSSAI" className="h-6 inline-block" />
          </p>
          <p className="mt-2 text-xs text-gray-600">
            Follow us on {" "}
            <a
              href="https://www.facebook.com/profile.php?id=100026579357343"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              Facebook
            </a>
            ,{" "}
            <a
              href="https://www.instagram.com/hungry.stomachs_/"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              Instagram
            </a>
            , and{" "}
            <a
              href="https://wa.me/c/918283830983"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
