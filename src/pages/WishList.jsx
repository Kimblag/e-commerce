import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteWishList, getWishList } from "../redux/actions";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import NewsLetter from "../components/newsletter/Newsletter";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BreadCrumbs from "../components/breadcrumb/BreadCrumbs";

const WishList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateRespWishList = useSelector((state) => state.resWishList);
  const stateWish = useSelector((state) => state.state_WishList);
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (userInfo !== null) {
      dispatch(getWishList({ email: userInfo.email }));
    }
  }, [stateRespWishList]);

  function handleDelete(e) {
    let id = Number(e.currentTarget.value);
    e.preventDefault();
    if (userInfo !== null) {
      dispatch(deleteWishList({ productId: id, email: userInfo.email }));
    }
  }

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
  let contador = 1;
  const ProductDivStyle = "flex w-[100%] h-auto items-center mobile:flex-col";

  const location = useLocation()
  const { pathname } = location;
  return (
    <div>
      <Navbar />
      <BreadCrumbs pathname={pathname} />
      <div className="p-3" style={{ maxWidth: "1680px" }}>
        <div className="flex justify-center text-5xl">Wish List</div>

        {/* //* Upper buttons div  */}

        {stateWish.length === 0 ||
        stateWish.data === "" ||
        stateWish.data === undefined ||
        stateWish.data.products.length === 0 ? (
          <div className="flex flex-col w-[100%] p-52 items-center">
            <p className="text-center text-2xl font-bold">
              Your wish list is empty!
            </p>
            <p>Explore more and shortlist some items</p>

            <p className="mt-4">
              <SentimentVeryDissatisfiedIcon />
            </p>
            <button
              onClick={() => navigate("/catalogue")}
              className="btn w-[200px] mt-5"
            >
              Explore
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-end mt-4 mobile:flex-col">
              <button
                onClick={() => navigate("/catalogue")}
                className="btn bg-white text-[#ee6c4d] border-2 hover:text-white hover:border-[#3d5a80] border-[#ee6c4d] mt-0"
              >
                Continue Shopping
              </button>
            </div>

            <div className="flex flex-row mt-7 mobile:flex-col ">
              <div className="flex flex-col flex-1">
                {/* //* List of products div */}
                {stateWish?.data?.products?.map((item) => (
                  <>
                    <div className="flex flex-col flex-1 self-center">
                      <div className={ProductDivStyle} key={contador++}>
                        <div className="product flex pl-5 self-start ">
                          <img
                            className="product_img w-[7rem]"
                            alt="product_image"
                            src={item.image}
                          />
                          <div className="disc flex items-start justify-between h-auto flex-col ml-6">
                          <Link className="ml-2" to={`/details/${item.id}`}>
                            <p>
                              <b className="mr-2 text-lg">{item.model}</b>
                            </p>
                            </Link>
                          </div>
                        </div>

                        <div className="product flex pl-5  ">
                          <Link className="ml-9" to={`/details/${item.id}`}>
                            {" "}
                            <FontAwesomeIcon
                            style={{fontSize: "1.8rem"}}
                              className="tableIcon"
                              icon={faCartPlus}
                            />{" "}
                          </Link>{" "}
                          <button
                          style={{fontSize: "1.7rem"}}
                            className="ml-5"
                            name={item.id}
                            value={item.id}
                            onClick={(e) => handleDelete(e)}
                          >
                            {" "}
                            <FontAwesomeIcon
                              className="ml-5 mb-1"
                              icon={faTrashAlt}
                            />{" "}
                          </button>{" "}
                        </div>
                      </div>
                      <hr className="mb-7 mt-7 mobile:mt-0" />
                    </div>
                  </>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default WishList;
