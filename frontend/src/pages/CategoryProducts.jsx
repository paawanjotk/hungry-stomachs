import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { getProductsByCategoryId } from "../http/products";

const CategoryProducts = () => {
  let categoryId = useParams().id;

  const [products, setProducts] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [category, setCategory] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProductsByCategoryId(categoryId);
        setProducts(res.products);
        setCategory(res.category);
      } catch (e) {
        console.log(e);
        setError(e.message);
      }
    })();
  }, []);

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (products === undefined || category === undefined) {
    return <h1>Loading..</h1>;
  }

  return (
    <div className="flex flex-col p-5 items-center gap-5 ">
      <h1 className="text-darkBrand text-6xl font-bold">{category.name}</h1>
      <ProductGrid products={products} />
    </div>
  );
};

export default CategoryProducts;
