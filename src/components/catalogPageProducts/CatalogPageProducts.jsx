import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getAllProducts, getWishList } from "../../redux/actions";
import Loader from "../loader/Loader";
import Pagination from "../pagination/Pagination";
import Product from "../products/Product";

const CatalogPageProducts = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const { allProducts, products, page } = useSelector((state) => state);
  const userInfo = useSelector((state) => state.userInfo);

  const stateWish = useSelector((state) => state.state_WishList);
  const stateRespWishList = useSelector((state) => state.resWishList);

  const productsPerPage = 16;
  const indexLastProduct = page * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;

  const currentProducts = products.slice(indexFirstProduct, indexLastProduct);

  const timer = (time) =>
    setTimeout(() => {
      setLoader(false);
    }, time);

  useEffect(() => {
    dispatch(clearDetail());
    setLoader(true);
    if (allProducts.length === 0) {
      dispatch(getAllProducts());
    }
    timer(500);
    return () => clearTimeout(timer);
  }, [dispatch, allProducts.length]);

  useEffect(() => {
    if (userInfo !== null) {
      dispatch(getWishList({ email: userInfo.email }));
    }
  }, [stateRespWishList]);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div
          className={
            loader
              ? "flex justify-center"
              : "grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
          }
        >
          {loader ? (
            <Loader />
          ) : (
            (products.length > 0 &&
              currentProducts?.map((product, index) => (
                <Product
                  key={index}
                  id={product.id}
                  price={product.price}
                  model={product.model}
                  image={product.image}
                  description={product.description}
                  porcentaje={product.porcentaje}
                  stateWish={stateWish}
                />
              ))) || (
              <div className="flex justify-center items-center self-center">
                <h1 className="text-gray-500 text-xl text-center">
                  There are no products in the catalogue
                </h1>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPageProducts;
