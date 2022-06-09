import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, clearDetail, combineStateCart } from "../redux/actions/index.js";
import Categories from "../components/categories/Categories";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import NewsLetter from "../components/newsletter/Newsletter";
import ProductsOnSale from "../components/onSale/ProductsOnSale";
import Products from "../components/products/Products";
import Slider from "../components/slider/Slider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const cartDetail1 = useSelector((state) => state.shoppingCart);

  useEffect(() => {
    dispatch(clearDetail());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo&& cartDetail1.length !==0) {
      cartDetail1.forEach(e => {
         setTimeout(() => {
           
         
      dispatch(combineStateCart(  {
        email: userInfo.email,
            data: [{
              sizes: e.sizes,
              id: e.id,
              quantity: 1,
        }],
      }
      ));
    }, 500);

    })
}}, []);

  return (
    <div style={{ maxWidth: "1680px" }}>
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <ProductsOnSale />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
