// import React from "react";
// import ProductCartButtons from "./ProductCartButtons";
// const Product = ({ imgUrl, name, description, price, _id }) => {
//   return (
//     <div className="flex gap- bg-secondary text-darkBrand p-4 gap-6 rounded-lg shadow-md">
//       {/* <img className="w-[150px] h-[180px] object-cover rounded-md" src={imgUrl} alt="chocolate" /> */}
//       <div  className="relative min-w-[150px]  rounded-lg bg-gray-200 overflow-hidden">
//           <img
//             src={imgUrl}
//             alt="chocolate"
//             className="absolute top-0 left-0 w-full h-full object-cover"
//           />
//         </div>
//       <div className="flex justify-between flex-col items-start">
//         <div className="flex flex-col gap-7 items-start">
//           <p className="  font-extrabold text-3xl">{name}</p>
//           <p className="  ">{description}</p>
//           <p className=" ">₹ {price}</p>
//         </div>
//         <ProductCartButtons _id={_id} />
//       </div>
//     </div>
//   );
// };

// export default Product;

import React from "react";
import ProductCartButtons from "./ProductCartButtons";

const Product = ({ imgUrl, name, description, price, _id }) => {
  return (
    <div className="flex flex-col md:flex-col lg:flex-row gap-4 bg-secondary text-darkBrand p-4 rounded-lg shadow-md">
      <div className="relative min-w-[150px] h-[200px] lg:h-[180px] rounded-lg bg-gray-200 overflow-hidden">
        <img
          src={imgUrl}
          alt={name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between items-start w-full">
        <div className="flex flex-col gap-2 lg:gap-4 items-start">
          <p className="font-extrabold text-xl lg:text-2xl break-words">{name}</p>
          <p className="text-sm md:text-sm lg:text-base break-words max-w-full">{description}</p>
          <p className="text-lg md:text-lg lg:text-xl">₹ {price}</p>
        </div>
        <ProductCartButtons _id={_id} />
      </div>
    </div>
  );
};

export default Product;

