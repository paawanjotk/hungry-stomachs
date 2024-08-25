import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BaseLayout = ({ children }) => {
  return (
    <div className="flex w-full flex-col min-h-screen p-4">
      <Navbar />
      <main className="flex-grow">
      {children}
      </main>
      <Footer />     
    </div>
  );
};

export default BaseLayout;
