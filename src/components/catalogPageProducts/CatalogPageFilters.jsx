import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CatalogPageFilters = ({
  allProducts,
  handleOrdered,
  handleFilter,
  handleClick,
}) => {
  const { brand, gender, order, category } = useSelector(
    (state) => state.filter
  );
  const navigate = useNavigate();

  function handleSelectChange(e) {
    e.preventDefault();
    if (e.target.name === "selectBrand") {
      handleFilter({
        brand: e.target.value,
        gender: gender,
        category: category,
      });
    }
    if (e.target.name === "selectGender") {
      handleFilter({
        brand: brand,
        gender: e.target.value,
        category: category,
      });
    }
    if (e.target.name === "selectCategory") {
      handleFilter({ brand: brand, gender: gender, category: e.target.value });
    }
  }

  let brands = [];
  function allUniqueProducts(allProducts) {
    allProducts?.forEach((product) => {
      if (!brands.includes(product?.brandName)) brands.push(product?.brandName);
    });
  }
  allUniqueProducts(allProducts);

  const genders = [];
  function allGenders(allProducts) {
    allProducts?.forEach((product) => {
      if (!genders.includes(product.gender)) genders.push(product.gender);
    });
  }
  allGenders(allProducts);

  const categories = [];
  function allCategories(allProducts) {
    allProducts?.forEach((product) => {
      if (product.CategName && !categories.includes(product.CategName))
        categories.push(product.CategName);
    });
  }
  allCategories(allProducts);



  return (
    <div className="flex flex-col p-5">
      <div className="flex items-center justify-between mt-3">
        <div className="flex mobile:flex-col">
          <button
            className="bg-[#ee6c4d] mr-2 hover:bg-[#3d5a80] text-white font-bold py-2 px-4 rounded-full"
            onClick={handleClick}
          >
            🗘
          </button>
          <p className="mt-1 ml-1">Filter by</p>

          <select
            value={brand}
            name="selectBrand"
            onChange={handleSelectChange}
            className="ml-3 border-2 border-silver mobile:ml-0"
          >
            <option value="All">Brand</option>
            {brands?.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>
          <select
            value={gender}
            name="selectGender"
            onChange={handleSelectChange}
            className="ml-3 border-2 border-silver mobile:ml-0"
          >
            <option value="filterByGender">Gender</option>
            {genders?.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>

          {categories.length ? (
            <select
              value={category}
              name="selectCategory"
              onChange={handleSelectChange}
              className="ml-3 border-2 border-silver mobile:ml-0"
            >
              <option value="filterByCategory">Categories</option>
              {categories?.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        <div className="flex mobile:flex-col mobile:items-end">
          <p className="mt-1">Sort by</p>
          <select
            value={order}
            onChange={handleOrdered}
            className="ml-3 border-2 border-silver"
          >
            <option value="">Sort</option>
            <option value="Mayor precio">Price (desc)</option>
            <option value="Menor precio">Price (asc)</option>
            <option value="Mas recientes">Newest (first)</option>
            <option value="Menos recientes">Oldest (first)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CatalogPageFilters;
