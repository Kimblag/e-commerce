import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TopProducts } from "../../apiFolder/TopProducts.js";
import { filterOfertDestacado } from "../../redux/actions/index.js";
import Announce from "../announce.jsx/Announce.jsx";
import Product from "../products/Product.jsx";
import OnSale from "./OnSale";

const ProductsOnSale = () => {
  const product_Promotion = useSelector((state) => state.inOfertAux);
  const stateWish = useSelector((state) => state.state_WishList);
  const stateRespWishList = useSelector((state) => state.resWishList);

  const dispatch = useDispatch();

  const [pagina, setPagina] = useState(1);
  const [sizeArray] = useState(4);
  const indexLastProduct = pagina * sizeArray;
  const indexFirstProduct = indexLastProduct - sizeArray;

  useEffect(() => {
    dispatch(filterOfertDestacado());
    setTimeout(() => {
      dispatch(filterOfertDestacado());
    }, 2000);
  }, []); //  eslint-disable-line react-hooks/exhaustive-deps

  let product_Promotion1 = [];
  if (product_Promotion !== undefined) {
    product_Promotion1 = product_Promotion;
  }
  let paginas = "";

  if (product_Promotion1.length !== 0) {
    paginas = Math.ceil(product_Promotion1.length / 4);
  }

  let currentProduct = product_Promotion1.slice(
    indexFirstProduct,
    indexLastProduct
  );

  if (paginas !== null && pagina === paginas + 1) {
    setPagina(1);
  }
  if (pagina === 0) {
    setPagina(paginas);
  }

  const handlePrevbtn = () => {
    setPagina(pagina - 1);
  };

  const handleNextbtn = () => {
    setPagina(pagina + 1);
  };
  function calculoDescuento(price, descuento) {
    let aplicar = Math.ceil((price * descuento) / 100);
    return price - aplicar;
  }
  function string_lentgMax(str) {
    let aplicar = str.slice(0, 20);
    return aplicar;
  }

  const arrowStyle =
    "rounded-full bg-grey flex justify-center items-center shadow-sm hover:cursor-pointer";
  return (
    <>
      <Announce title={"Hurry up! Up to 40% off sale!"} />
      {currentProduct.length === 0 ? (
        <div className="flex items-center justify-center">
          <h1>No products</h1>
        </div>
      ) : (
        <div className=" m-12 h-[440px] max-w-[1700px] bg-white flex items-center justify-between">
          {/* //* leftarrow div */}
          <div className={arrowStyle}>
            <ArrowLeftOutlined
              style={{ fontSize: "50px" }}
              onClick={handlePrevbtn}
            />
          </div>
          <div className="flex flex-row p-5 items-center justify-center">
            {currentProduct.map((product, index) => (
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
            ))}
          </div>
          {/* //* rightarrow div */}
          <div className={arrowStyle}>
            <ArrowRightOutlined
              style={{ fontSize: "50px" }}
              onClick={handleNextbtn}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsOnSale;
