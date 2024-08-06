import React, { useEffect } from "react";
import Category from "../components/Category";
import { Link } from "react-router-dom";
import { getCategories } from "../http/categories";

const Categories = () => {
  const [categories, setCategories] = React.useState(undefined);
  const [error, setError] = React.useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        setCategories(await getCategories());
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (categories === undefined) {
    return <h1>Loadig...</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-black text-7xl font-bold">Browse Categories</h1>
      <div className="grid grid-cols-3 gap-10 p-10 ">
        {categories.map((category) => {
          return (
            <Link to={`/categories/${category._id}`}>
              <Category {...category} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
