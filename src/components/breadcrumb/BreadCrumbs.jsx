import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductById } from "../../redux/actions";

const BreadCrumbs = ({ pathname, id }) => {
  const details = useSelector((state) => state.details);

  return (
    <nav className="bg-gray-100 px-5 py-3 rounded-md w-full">
      <ol className="list-reset flex">
        {
          <>
            <li>
              <Link to="/" className="text-blue-600 hover:text-blue-700">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 mx-2">/</span>
            </li>

            {
              <li>
                <Link
                  to="/catalogue"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Catalogue
                </Link>
              </li>
            }
          </>
        }
        {(pathname === `/details/${id}` && (
          <>
            <li>
              <span className="text-gray-500 mx-2">/</span>
            </li>
            <li className="text-gray-500">{details.model}</li>
          </>
        )) ||
          (pathname === "/profile" && (
            <>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li className="text-gray-500">{pathname.split("/")}</li>
            </>
          )) ||
          (pathname === "/wishlist" && (
            <>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li className="text-gray-500">{pathname.split("/")}</li>
            </>
          )) ||
          (pathname === "/cart" && (
            <>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li className="text-gray-500">{pathname.split("/")}</li>
            </>
          )) ||
          (pathname === "/checkout" && (
            <>
              <>
                  <li>
                    <span className="text-gray-500 mx-2">/</span>
                  </li>
                <Link to="/cart">
                  <span><li className="text-blue-700">cart</li></span>
                </Link>
              </>
              <>
                <li>
                  <span className="text-gray-500 mx-2">/</span>
                </li>
                <li className="text-gray-500">{pathname.split("/")}</li>
              </>
            </>
          ))}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
