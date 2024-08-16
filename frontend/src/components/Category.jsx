import React from "react";

const Category = ({ id, imgUrl, name, description }) => {
  return (
    <div className="flex gap-10 border-2 p-4 bg-primary border-primary rounded-lg w-[580px] h-[250px] justify-center items-center shadow-lg">
      <img
        src={imgUrl}
        alt="chocolate"
        className="w-[150px] h-[180px] object-cover rounded-md"
      />
      <div className="flex justify-between flex-col items-start">
        <div className="flex flex-col gap-7 items-start">
          <p className=" text-white font-extrabold text-4xl">{name}</p>
          <p className=" text-white text-pretty text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
