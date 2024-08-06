import React from "react";

const Category = ({ id, imageUrl, name, description }) => {
  return (
    <div className="flex h-full  w-full gap-10 border-2 p-4 bg-primary border-primary rounded-lg max-w-[800px] shadow-lg">
      <img src={imageUrl} alt="chocolate" className="w-2/6 rounded-md" />
      <div className="flex justify-between flex-col items-start">
        <div className="flex flex-col gap-7 items-start">
          <p className=" text-white font-extrabold text-6xl">{name}</p>
          <p className=" text-white text-pretty">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
