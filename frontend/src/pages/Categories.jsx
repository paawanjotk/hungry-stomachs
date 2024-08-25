// import React, { useEffect } from "react";
// import Category from "../components/Category";
// import { Link } from "react-router-dom";
// import { getCategories } from "../http/categories";
// import LoadingSpinner from "../components/LoadingSpinner";

// const Categories = () => {
//   const [categories, setCategories] = React.useState(undefined);
//   const [error, setError] = React.useState(undefined);

//   useEffect(() => {
//     (async () => {
//       try {
//         setCategories(await getCategories());
//       } catch (e) {
//         setError(e.message);
//       }
//     })();
//   }, []);

//   if (error) {
//     return <h1>Error: {error}</h1>;
//   }

//   if (categories === undefined) {
//     return (
//       <div>
//         <LoadingSpinner/>
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col justify-center items-center p-4">
//       <h1 className="text-black text-7xl font-bold">Browse Categories</h1>
//       <div className="grid grid-cols-3 gap-10 p-10 ">
//         {categories.map((category) => {
//           return (
//             <Link to={`/categories/${category._id}`}>
//               <Category {...category} />
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Categories;
import React, { useEffect } from "react";
import Category from "../components/Category";
import { Link } from "react-router-dom";
import { getCategories } from "../http/categories";
import LoadingSpinner from "../components/LoadingSpinner";

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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-black text-3xl md:text-5xl lg:text-7xl font-bold mb-8 text-center">
        Browse Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-12 p-6 md:p-10 lg:p-12 w-full max-w-7xl">
        {categories.map((category) => (
          <Link key={category._id} to={`/categories/${category._id}`} className="block h-full">
            <Category {...category} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;


