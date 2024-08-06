import React from "react";
import ProductCartButtons from "./ProductCartButtons";
const Product = ({ imgUrl, name, description, price, _id }) => {
  return (
    <div className="flex gap-10 bg-secondary text-darkBrand p-4 rounded-lg shadow-md">
      <img className="w-2/6 rounded-md" src={imgUrl} alt="chocolate" />

      <div className="flex justify-between flex-col items-start">
        <div className="flex flex-col gap-7 items-start">
          <p className="  font-extrabold text-6xl">{name}</p>
          <p className="  ">{description}</p>
          <p className=" ">₹ {price}</p>
        </div>
        <ProductCartButtons _id={_id} />
      </div>
    </div>
  );
};

export default Product;
