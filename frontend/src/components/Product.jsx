import React from "react";
import ProductCartButtons from "./ProductCartButtons";
const Product = ({ imgUrl, name, description, price, _id }) => {
  return (
    <div className="flex gap- bg-secondary text-darkBrand p-4 gap-6 rounded-lg shadow-md">
      {/* <img className="w-[150px] h-[180px] object-cover rounded-md" src={imgUrl} alt="chocolate" /> */}
      <div  className="relative min-w-[150px]  rounded-lg bg-gray-200 overflow-hidden">
          <img
            src={imgUrl}
            alt="chocolate"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      <div className="flex justify-between flex-col items-start">
        <div className="flex flex-col gap-7 items-start">
          <p className="  font-extrabold text-3xl">{name}</p>
          <p className="  ">{description}</p>
          <p className=" ">₹ {price}</p>
        </div>
        <ProductCartButtons _id={_id} />
      </div>
    </div>
  );
};

export default Product;
