import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BreadCrumbs from "../components/breadcrumb/BreadCrumbs";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import NewsLetter from "../components/newsletter/Newsletter";
import {
  addShoppingCart,
  clearDetail,
  getAllRewies,
  getProductById,
  getShoppingCart,
} from "../redux/actions";
import { Divider } from "@material-ui/core";
import ReviewProductDetail from "../components/userReviews/ReviewProductDetail";
import { AiFillStar } from "react-icons/ai";

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [number, setNumber] = useState(0);
  const params = useParams();
  let addres = params.id;
  const detail = useSelector((state) => state.details);
  const userInfo = useSelector((state) => state.userInfo);
  const cartDetail1 = useSelector((state) => state.shoppingCart);
  const stateReview = useSelector((state) => state.All_Review);

  const [itemsCarts, setItemsCarts] = useState({
    id: "",
    quantity: [],
    sizes: "",
  });

  useEffect(() => {
    dispatch(getProductById(addres));
    setTimeout(() => {
      dispatch(getProductById(addres));

    }, 1000);
    dispatch(getShoppingCart());
    return () => {
      dispatch(clearDetail());
      setNumber(0);
    };
  }, []); //  eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    // dispatch(getProductById(addres));
  }, [itemsCarts]); //  eslint-disable-line react-hooks/exhaustive-deps

  let product = {};
  if (detail !== undefined) {
    product = detail;
  }

  useEffect(() => {
    setItemsCarts({
      id: addres,
    });
  }, [product]); //  eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(getAllRewies(addres));
  }, []);

  useEffect(() => {
    let valueStart = total_Rating / totalLength;
    if (valueStart) {
      setNumber(Math.ceil(valueStart));
    }
    if (!valueStart) {
      setNumber(0);
    }
  }, [stateReview?.data]);

  async function CargarCarrito() {
    if (itemsCarts.sizes === undefined) {
      toast.warn("Complete size", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(addShoppingCart(itemsCarts));
      if (userInfo) {
        await axios.post(`${process.env.REACT_APP_API_URL}/orders/create`, {
          email: userInfo.email,
          data: [
            {
              sizes: itemsCarts.sizes,
              id: itemsCarts.id,
              quantity: 1,
            },
          ],
        });
      }

      // console.log("esto envias al carrito ", itemsCarts);

      toast.success("Product added successfully to cart!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  function handleTalle(e) {
    // e.preventDefault()
    setItemsCarts({
      ...itemsCarts,
      sizes: e.target.value,
      quantity: 1,
    });
  }

  function totalRating() {
    let totalRating = 0;
    stateReview?.data?.forEach((e) => {
      totalRating += Number(e.rating);
    });
    return totalRating;
  }
  let total_Rating = totalRating();

  function total_length() {
    let total = stateReview?.data?.length;
    return total;
  }
  let totalLength = total_length();

  function totalCommentary() {
    let total = stateReview?.data?.map((e) => ({
      commentary: e.commentary,
      rating: e.rating,
    }));
    return total;
  }
  let arrayCommentary = totalCommentary();
  const location = useLocation()
  const { pathname } = location;
 

  return (
    <div>
      <Navbar />
      <BreadCrumbs pathname={pathname} id={addres} />
      <div className="flex lg:flex-row justify-center mb-10 sm:flex-col sm:mt-4 sm:mb-8 sm:p-3">
        <div className="flex-1 flex items-center justify-center">
          <img
            alt="product_detail"
            src={detail.image}
            className="w-[80%] h-[90%] rounded-lg shadow-lg hover:scale-[1.1] ease-in duration-300"
          />
        </div>
        <div className="flex-[1.3] flex flex-col items-start  justify-items-center mt-10 mobile:items-center">
          <h1 className="title text-[30px] mobile:text-[20px]">
            {detail.model}
          </h1>
          <p className="flex flex-row items-center text-[#ee6c4d] italic text-2xl" >Rating {number && number } <AiFillStar className="" style={{ color: "orange" }}/> </p> 
          <hr />
          <hr></hr>
          <p className="pr-[4rem] text-justify mt-7 mobile:pr-0">
            {detail.description}
          </p>
          <p className="pr-[4rem] text-justify mt-4 ">
            Gender: <b>{detail.gender}</b>
          </p>
          {detail.CategName ? (
            <p className="pr-[4rem] text-justify mt-4">
              Category: <b>{detail.CategName}</b>
            </p>
          ) : null}

          <div className="flex flex-col place-self-start">
            <p className="mt-7 text-3xl">
              Price: <b>${detail.price}</b>
            </p>
            {detail.porcentaje && (
              <p className="pr-[4rem] text-justify mt-4">
                Discount: <b>{detail.porcentaje}%</b>{" "}
                <span>
                  Now:{" "}
                  <b>
                    $
                    {detail.price -
                      Math.ceil((detail.price * detail.porcentaje) / 100)}
                  </b>
                </span>
              </p>
            )}

            {/* //* size */}
            <div className="flex items-center mt-6">
              <p className="pr-[2rem] text-justify">Sizes: </p>
              {detail.sizes?.map((item) => (
                <button
                  className="inline-block rounded-full bg-[#98c1d9] text-white leading-normal uppercase shadow-md hover:bg-[#e0fbfc] hover:text-black hover:shadow-lg focus:bg-[#ee6c4d] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#ee6c4d] active:shadow-lg transition duration-150 ease-in-out w-9 h-9"
                  key={item.size}
                  value={item.size}
                  onClick={(e) => handleTalle(e)}
                >
                  {item.size}
                </button>
              ))}
            </div>
            {itemsCarts.sizes && (
              <p className="pr-[4rem] text-justify mt-4">
                Selected size: <b>{itemsCarts.sizes}</b>
              </p>
            )}
          </div>
          <button
            onClick={(e) => CargarCarrito(e)}
            className=" btn text-white rounded-md shadow-md mt-[30px] p-3"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <Divider />
      {number === 0 || number === "NaN" ? null : (
        <ReviewProductDetail number={number} arrayCommentary={arrayCommentary} totalLength={totalLength} />
      )}
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default ProductDetail;
