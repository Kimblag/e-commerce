import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addWishList, deleteWishList } from "../../redux/actions";

const Product = ({ id, model, price, image, porcentaje, stateWish }) => {
  const [hoverEffects, setHoverEffects] = useState(" opacity-0");

  const iconStyle =
    "h-[40px] w-[40px] rounded-full bg-white flex items-center justify-center m-3 hover:bg-[#ee6c4d] hover:text-white hover:scale-[1.1] ease-in duration-100 cursor-pointer";

  function handleHoverEnter() {
    setHoverEffects(" opacity-1 bg-[rgba(0,0,0,0.2)]");
  }

  function handleHoverExit() {
    setHoverEffects(" opacity-0");
  }

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const { page } = useSelector((state) => state);
  const [local, setLocal] = useState(false);

  useEffect(() => {
    if (array.length !== 0 && array.includes(id)) {
      setLocal(true);
    } else {
      setLocal(false);
    }
  }, []);

  useEffect(() => {
    if (array.length !== 0 && array.includes(id)) {
      setLocal(true);
    } else {
      setLocal(false);
    }
  }, [page]);

  let array = [];
  if (userInfo) {
    if (
      stateWish.data?.products !== undefined &&
      stateWish.data?.products !== null &&
      stateWish.data?.products.length !== 0
    ) {
      stateWish.data.products.forEach((e) => {
        array.push(e.id);
      });
    }
  }
  // console.log(array);

  function handleWishList(e) {
    if (!userInfo) {
      e.preventDefault();
      toast.warn("You need to register", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (userInfo) {
      if (array.length !== 0 && array.includes(id)) {
        e.preventDefault();
        dispatch(
          deleteWishList({ productId: Number(id), email: userInfo.email })
        );
        setLocal(false);
      } else {
        e.preventDefault();
        dispatch(addWishList({ productId: Number(id), email: userInfo.email }));
        setLocal(true);
      }
    }
  }

  return (
    <div
      className="flex items-center flex-col p-3 justify-center flex-1 min-w-[280px] min-h-[350px] m-2 overflow-hidden rounded-md shadow-lg relative"
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverExit}
    >
      
      <img src={image} alt="product" />
      <div
        className={
          `flex items-center justify-center absolute w-[100%] h-[100%] ease-in duration-100` +
          hoverEffects
        }
      >
        {local === false ? (
          <button className={iconStyle} onClick={(e) => handleWishList(e)}>
            <FavoriteBorderOutlined />
          </button>
        ) : (
          <button className={iconStyle} onClick={(e) => handleWishList(e)}>
            <FavoriteBorderOutlined />
          </button>
        )}
        <Link to={`/details/${id}`}>
        <button className={iconStyle}>
          <SearchOutlined />
        </button>
        </Link>
        <div></div>
      </div>
      <div className="flex flex-col">
        <h5 className="text-gray-900 text-md font-medium mb-2">{model}</h5>
        {porcentaje !== null ? (<><p className="text-gray-700 text-xl line-through mb-4">${price} </p>  <span className="text-2xl text-red-500">Discount: %{porcentaje}</span></>) : (<p className="text-gray-700 text-xl mb-4">${price}</p>)}
        {porcentaje !== null && (
          <p className="text-xl text-green-600">Now: ${price - Math.ceil((price * porcentaje) / 100)} </p>
        )}
      </div>
    </div>
  );
};

export default Product;
