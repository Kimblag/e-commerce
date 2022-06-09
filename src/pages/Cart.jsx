import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumbs from "../components/breadcrumb/BreadCrumbs";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import NewsLetter from "../components/newsletter/Newsletter";
import ShoppingCartAux from "../components/shoppingCartAux/ShoppingCartAux";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import {
  addOneProductCart,
  getAllProducts,
  getCartBack,
  getShoppingCart,
  removeBackCart,
  removeOneProductCart,
  removeProductCart,
} from "../redux/actions";


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartDetail1 = useSelector((state) => state.shoppingCart);
  const cartDetailRegisterUser = useSelector(
    (state) => state.shoppingCartUserRegister
  );
  const userInfo = useSelector((state) => state.userInfo);
  const arrayAll = useSelector((state) => state.allProducts);

  const resRemoveCart = useSelector((state) => state.RemoveBackShoppingCart);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []); //  eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(getShoppingCart());
  }, [arrayAll]); //  eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (userInfo) {
      dispatch(getCartBack(userInfo.email));
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      dispatch(getCartBack(userInfo.email));
    }
  }, [cartDetail1, resRemoveCart]); //  eslint-disable-line react-hooks/exhaustive-deps

  let cartDetail = [];

  if (userInfo) {
    cartDetail = cartDetailRegisterUser;
  } else {
    cartDetail = cartDetail1;
  }

  let arraySeleccion = [];
  arrayAll.forEach((e) => {
    arraySeleccion.push({
      id: String(e.id),
      price: e.price,
      image: e.image,
      inOferta: e.inOferta,
      model: e.model,
      porcentaje: e.porcentaje,
    });
  });

  const getMap = (param) => {
    let array = [];
    param.map((e) =>
      arraySeleccion.forEach((el) => {
        String(el.id) === String(e.id) && array.push(Object.assign(e, el));
      })
    );
    return array;
  };
  const newArray = getMap(cartDetail);

  let sumItems = Number("");
  newArray.forEach((e) => {
    sumItems += Number(e.quantity);
  });

  let sumPrice = Number("");

  newArray.forEach((e) => {
    let result =
      e.quantity * (e.price - Math.ceil((e.price * e.porcentaje) / 100));

    sumPrice += Number(result);
  });

  function handleDeleteProductoCart(parametro) {
    console.log(parametro);
    if (userInfo) {
      parametro.email = userInfo.email;
      dispatch(removeBackCart(parametro));
    } else {
      dispatch(removeProductCart(parametro));
    }
  }
  function handleDeleteOneProductoCart(parametro) {
    // console.log(parametro)
    if (userInfo && parametro.quantity === 1) {
      parametro.email = userInfo.email;
      dispatch(removeBackCart(parametro));
    } else {
      dispatch(removeOneProductCart(parametro));
    }
  }

  function handleAddOneProductoCart(parametro) {
    dispatch(addOneProductCart(parametro));
  }

  let contador = 1;

  const handleVerifyLogin = () => {
    if (userInfo) {
      navigate("/checkout");
    } else {
      navigate("/signin");
      if (userInfo) {
        window.location.href = "/checkout";
      }
    }
  };

  const SummaryItemStyle = "SummaryItem flex justify-between mt-3 w-[100%]";
  const ProductDivStyle = "flex w-[100%] h-auto items-center mobile:flex-col";
  const PriceQuantityStyle =
    "flex-auto flex flex-col justify-center items-end mr-7 mobile:mt-7 mobile:mb-7";

    const location = useLocation()
    const { pathname } = location
  return (
    <div>
      <Navbar />
      <BreadCrumbs pathname={pathname} />

      <div className="p-3">
        <div className="flex justify-center text-5xl">Cart 🛒</div>

        {/* //* Upper buttons div  */}
        <div className="flex items-center justify-between m-8 mobile:flex-col">
          <button
            onClick={() => navigate("/catalogue")}
            className="btn bg-white text-[#ee6c4d] border-2 border-[#ee6c4d] mt-0"
          >
            Continue Shopping
          </button>

          <div className="flex underline text-lg hover:cursor-pointer mobile:m-5">
            <p>Items in your cart: {sumItems}</p>
          </div>

          <button className="btn mt-0" onClick={(e) => handleVerifyLogin(e)}>Checkout Now</button>
        </div>

        {/* //* central div */}

        <div className="flex flex-row mt-7 mobile:flex-col ">
          <div className="flex flex-col flex-1 mt-4">
            {/* //* List of products div */}
            {newArray.map((item) => (
              <>
                <div key={contador++} className="flex flex-col flex-1">
                  <div className={ProductDivStyle}>
                    <div className="product flex pl-5 self-start">
                      <img
                        className="product_img w-[7rem]"
                        alt="product_image"
                        src={item.image}
                      />
                      <div className="disc flex items-start justify-between h-auto flex-col ml-6">
                        <p>
                          <b className="mr-2"> ID: {item.id}</b>
                        </p>
                        <p>
                          <b className="mr-2">Product:</b>
                          {item.model}
                        </p>
                        <p>
                          <b className="mr-2">Size:</b>
                          {item.sizes}
                        </p>
                      </div>
                    </div>

                    {/* //* products quantity and price */}

                    <div className={PriceQuantityStyle}>
                      <div>
                        <div className="counter flex items-center text-2xl justify-start">
                          Quantity
                          <div className="ml-5 shadow-md flex">
                            <div
                              onClick={() =>
                                handleDeleteOneProductoCart({
                                  id: item.id,
                                  sizes: item.sizes,
                                  quantity: item.quantity,
                                })
                              }
                              className="bg-[#ee6c4d] text-white w-8 flex items-center justify-center rounded-l-lg cursor-pointer"
                            >
                              -
                            </div>
                            <div className="w-8 flex items-center justify-center border-[1px] border-[#8a4af3]">
                              {item.quantity}
                            </div>
                            <div
                              onClick={() =>
                                handleAddOneProductoCart({
                                  id: item.id,
                                  sizes: item.sizes,
                                })
                              }
                              className="bg-[#ee6c4d] text-white w-8 flex items-center justify-center rounded-r-lg cursor-pointer"
                            >
                              +
                            </div>
                          </div>
                        </div>
                      </div>
                      {!item.porcentaje ? (
                        <p className="flex items-center justify-center text-2xl mt-3">
                          Price: <b>${item.price * item.quantity}</b>
                        </p>
                      ) : (
                        <p className="flex items-center justify-center text-2xl mt-3">
                          Price:{" "}
                          <b>
                            {item.quantity *
                              (item.price -
                                Math.ceil(
                                  (item.price * item.porcentaje) / 100
                                ))}
                          </b>
                        </p>
                      )}
                     
                    </div>
                  </div>
                  <hr className="mb-7 mt-7 mobile:mt-0" />
                </div>
              </>
            ))}
          </div>
          <ShoppingCartAux newArray={newArray} />
          {newArray.length > 0 && (
            <div className="Summary flex-[0.4] flex flex-col mb-5 items-center w-auto h-[40vh] border-2 border-[#3d5a80] rounded-md shadow-lg p-5 text-lg mobile:mb-6 ">
              <h1 className="text-[1.5rem]">SUMMARY</h1>

              <div className={SummaryItemStyle}>
                <p>Product quantity</p>
                <p>
                  <b>{sumItems}</b>
                </p>
              </div>

              <div className={SummaryItemStyle + " text-3xl font-bold"}>
                <p>Total:</p>
                <p>${sumPrice}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Cart;
