// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ProductGrid from "../components/ProductGrid";
// import { getProductsByCategoryId } from "../http/products";
// import LoadingSpinner from "../components/LoadingSpinner";

// const CategoryProducts = () => {
//   let categoryId = useParams().id;

//   const [products, setProducts] = useState(undefined);
//   const [error, setError] = useState(undefined);
//   const [category, setCategory] = useState(undefined);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getProductsByCategoryId(categoryId);
//         setProducts(res.products);
//         setCategory(res.category);
//       } catch (e) {
//         console.log(e);
//         setError(e.message);
//       }
//     })();
//   }, []);

//   if (error) {
//     return <h1>Error: {error}</h1>;
//   }

//   if (products === undefined || category === undefined) {
//     return (
//       <div>
//         <LoadingSpinner/>
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col p-5 items-center gap-5 ">
//       <h1 className="text-darkBrand text-6xl font-bold">{category.name}</h1>
//       <ProductGrid products={products} />
//     </div>
//   );
// };

// export default CategoryProducts;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { getProductsByCategoryId } from "../http/products";
import LoadingSpinner from "../components/LoadingSpinner";
import { IoMdArrowBack } from "react-icons/io";

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
  }, [categoryId]);

  if (error) {
    return <h1 className="text-red-500 text-2xl">{error}</h1>;
  }

  if (products === undefined || category === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 md:p-4 lg:p-8 xl:p-12 items-center gap-5 w-full max-w-full mx-auto">
      <Link to="/categories">
        <IoMdArrowBack className="text-darkBrand text-2xl" />
      </Link>
      <h1 className="text-darkBrand text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-bold text-center">
        {category.name}
      </h1>
      <ProductGrid products={products} />
    </div>
  );
};

export default CategoryProducts;
