import React from "react";
import Product from "./Product";

const ProductGrid = ({ products }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Product key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

