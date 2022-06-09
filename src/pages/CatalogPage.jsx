import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BreadCrumbs from "../components/breadcrumb/BreadCrumbs";
import CatalogPageFilters from "../components/catalogPageProducts/CatalogPageFilters";
import CatalogPageProducts from "../components/catalogPageProducts/CatalogPageProducts";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import NewsLetter from "../components/newsletter/Newsletter";
import Pagination from "../components/pagination/Pagination";
import {
  clearDetail,
  filter,
  getAllProducts,
  getWishList,
  orderProducts,
  setCurrentPage,
} from "../redux/actions";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { allProducts, products, page } = useSelector((state) => state);
  const [loader, setLoader] = useState(true);
  const [filters, setFilters] = useState(false);
  // ---------------------------
  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);
  // --------------------------------
  const productsPerPage = 16;

  const timer = (time) =>
    setTimeout(() => {
      setLoader(false);
    }, time);


  const handleOrdered = (e) => {
    e.preventDefault();
    dispatch(orderProducts(e.target.value));
  };

  const handleFilter = (filters) => {
    dispatch(filter(filters));
    dispatch(setCurrentPage(1));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLoader(true);
    dispatch(getAllProducts());
    dispatch(setCurrentPage(1));
    timer(500);
  };

  return (
    <div>
      <Navbar />
      <BreadCrumbs pathname={pathname} />
      <CatalogPageFilters
        handleClick={handleClick}
        allProducts={allProducts}
        handleOrdered={handleOrdered}
        handleFilter={handleFilter}
        products={products}
      />
      <CatalogPageProducts products={products} />
      <Pagination productsPerPage={productsPerPage} />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default CatalogPage;
