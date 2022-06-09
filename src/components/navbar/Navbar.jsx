import React, { useEffect, useState } from "react";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import {
  getAllProducts,
  getCartBack,
  getShoppingCart,
  postLogOut,
  setCurrentPage,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { faHeart, faUser, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const arrayAll = useSelector((state) => state.allProducts);
  const cartDetail1 = useSelector((state) => state.shoppingCart);
  const cartDetailRegisterUser = useSelector(
    (state) => state.shoppingCartUserRegister
  );
  const resRemoveCart = useSelector((state) => state.RemoveBackShoppingCart);

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
    param?.map((e) =>
      arraySeleccion?.forEach((el) => {
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

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const timer = (time) =>
    setTimeout(() => {
      dispatch(getAllProducts(search));
    }, time);

  const handleOnClick = (e) => {
    e.preventDefault();

    try {
      if (!search) {
        toast.warn("Insert shoes name");
      } else {
        dispatch(getAllProducts(search));
        dispatch(setCurrentPage(1));
        navigate("/catalogue");
        setSearch({ search });
        timer(500);
        setSearch("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signOutHandler = () => {
    dispatch(postLogOut());
    window.localStorage.removeItem("userInfo");
    navigate("/");
  };

  const style = "text-[14px] cursor-pointer ml-[25px] text-white ";
  return (
    <div className="navbar h-[60px] shadow-md relative z-10 bg-[#293241] ">
      <div className="wrapper  pl-[20px] pr-[20px] pt-[10px] pb-[10px] flex justify-between items-center">
        {/* //* left-div */}
        <div className="left flex flex-1 items-center">
          <form
            onSubmit={handleOnClick}
            className="searchInput flex border-[2px] border-solid border-[#98c1d9] rounded-md items-center ml-[10px] p-[5px] focus-within:border-[#ee6c4d] transition-all"
          >
            <input
              className="input outline-none bg-[#293241] text-white "
              type="text"
              placeholder="Search Product..."
              onChange={handleOnChange}
              value={search}
            />
            <Search
              onClick={handleOnClick}
              className=""
              style={{ fontSize: "16px", color: "white" }}
            />
          </form>
        </div>

        {/* //* logo */}
        <div className="center flex-1 text-center ">
          <Link to="/">
            <div className="logo font-bold text-lg text-white">
              My e-Commerce
            </div>
          </Link>
        </div>

        {/* //* right div */}
        <div className="right flex flex-1 items-center justify-end">
          {!userInfo ? (
            <>
              <Link to="/register">
                <div className={style}>Register</div>
              </Link>
              <Link to="/signin">
                <div className={style}>Sign in</div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile">
                <div className={style}>
                  {userInfo.name} <FontAwesomeIcon icon={faUser} />
                </div>
              </Link>
              <Link to="/wishlist">
                <div className={style}>
                  Wish List <FontAwesomeIcon icon={faHeart} />
                </div>
              </Link>
              <div onClick={signOutHandler} className={style}>
                Logout <FontAwesomeIcon icon={faSignOut} />
              </div>
            </>
          )}
          <Link to="/cart">
            <div className={style}>
              <Badge badgeContent={sumItems} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </div>
          </Link>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </div>
  );
};

export default Navbar;
