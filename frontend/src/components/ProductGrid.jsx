import React from "react";
import Product from "./Product";

const ProductGrid = ({ products }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-10">
        {products.map((product) => {
          return <Product {...product} />;
        })}
      </div>
    </div>
  );
};

export default ProductGrid;
