import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  clearShoppingCart,
  getAllProducts,
  getCartBack,
  getStateCart,
} from "../redux/actions/index.js";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { Paper } from "@material-ui/core";

const PaymentSuccess = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const products = useSelector((state) => state.allProducts);
  const cartUser = useSelector((state) => state.AuxShopingCartBack);
  console.log(cartUser.newArray);
  const dispatch = useDispatch();

  var prices = cartUser?.newArray?.map(
    (e) => e.price - Math.ceil((e.price * e.porcentaje) / 100)
  );
  console.log(prices);

  const closeCart = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/payment/payment-success`,
        { email: userInfo.email, prices: prices }
      );
      // console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCartBack(userInfo.email));

    closeCart();
    setTimeout(() => {
      dispatch(clearShoppingCart());
      window.location.href = "/profile";
    }, 2000);
  }, [dispatch]);


  return (
    <div>
      <Paper elevation={0}>
        <Alert severity="success">
          {/* <img src={toni} alt="toni faro" /> */}
          <div>
            <p>Payment successful</p>
            <p>Redirecting to HenryShoes...</p>
          </div>
        </Alert>
      </Paper>
    </div>
  );
};

export default PaymentSuccess;
