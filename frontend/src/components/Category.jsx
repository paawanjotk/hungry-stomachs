
import React from "react";

const Category = ({ id, imgUrl, name, description }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 border-2 p-6 bg-primary border-primary rounded-lg h-full shadow-lg">
      <img
        src={imgUrl}
        alt={name}
        className="w-full md:w-[180px] h-[180px] object-cover rounded-md"
      />
      <div className="flex flex-col justify-center gap-3">
        <p className="text-white font-extrabold text-2xl md:text-3xl">{name}</p>
        <p className="text-white text-pretty text-base md:text-lg">{description}</p>
      </div>
    </div>
  );
};

export default Category;




