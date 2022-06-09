import React from "react";
import { ApiCategories } from "../../apiFolder/CategoriesApi.js";
import Category from "./Category";

const Categories = () => {
  return (
    <div className="flex justify-between items-center p-5">
      {
          ApiCategories.map((item, index) => (
            <Category key={index} item={item} />
          ))
      }
    </div>
  );
};

export default Categories;
