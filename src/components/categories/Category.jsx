import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearDetail, filter, getAllProducts } from "../../redux/actions";

const Category = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  // useEffect(() => {
  //   dispatch(clearDetail());
  //   dispatch(getAllProducts());
  // }, [dispatch]);



  return (
    <div className="flex-1 m-2 shadow-lg rounded-md overflow-hidden relative">
      <img src={item.src} className="w-[100%]" alt="category_img" />
      <div className="flex absolute w-[100%] h-[100%] left-0 top-0 items-center justify-center flex-col mt-10">
        <h2 className="text-white font-medium text-[30px]">{item.title}</h2>
        <button
          onClick={() => {
            if (item.title === "Men") {
              
              dispatch(
                filter({
                  brand: "All",
                  gender: "men",
                  category: "filterByCategory",
                })
              );
              navigate("/catalogue");
            } else if (item.title === "Unisex") {
              dispatch(
                filter({
                  brand: "All",
                  gender: "unisex",
                  category: "filterByCategory",
                })
              );
              navigate("/catalogue");
            } else if (item.title === "Women") {
              console.log(item.title, "SOY TITLE")
              dispatch(
                filter({
                  brand: "All",
                  gender: "women",
                  category: "filterByCategory",
                })
              );
              navigate("/catalogue");
            } else if(item.title === "Child"){
              console.log(item.title, "SOY TITLE")
              dispatch(
                filter({
                  brand: "All",
                  gender: "child",
                  category: "filterByCategory",
                })
              );
              navigate("/catalogue");
            }
          }}
          className="btn"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default Category;
