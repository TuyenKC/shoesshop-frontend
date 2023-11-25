import React, { useState } from "react";
import { useEffect } from "react";
import { request } from "../../../axios_helper";
import { toast } from "react-toastify";
import AddToCart from "../userCart/AddToCart";
import { Link } from "react-router-dom";
import IconCart from "../../../static/icons/IconCart";
import IconStar from "../../../static/icons/IconStar";

function ProductList({ user }) {
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Tất cả");
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProduct] = useState([]);
  const [addToCartProduct, setAddToCartProduct] = useState();
  const [isAddToCartOpen, setAddToCartOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const priceRanges = [
    "Tất cả",
    "0-500.000",
    "500.000-1.000.000",
    "1.000.000-2.000.000",
    "2.000.000+",
  ];
  useEffect(() => {
    request("GET", "/api/v1/brand/valid", {})
      .then((response) => {
        if (response.data.status === "200") {
          const listBrands = [{ brandName: "Tất cả" }];
          response.data.data.forEach((brand) => {
            listBrands.push(brand);
          });
          setBrands(listBrands);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  }, []);
  useEffect(() => {
    request("GET", "/api/v1/category/valid", {})
      .then((response) => {
        if (response.data.status === "200") {
          const listCategories = [{ categoryName: "Tất cả" }];
          response.data.data.forEach((category) => {
            listCategories.push(category);
          });
          setCategories(listCategories);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  }, []);
  useEffect(() => {
    request("GET", "/api/v1/product/valid", {})
      .then((response) => {
        if (response.data.status === "200") {
          setProducts(response.data.data);
          setFilterProduct(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  }, []);
  useEffect(() => {
    filterProduct();
  }, [
    selectedBrand,
    selectedCategory,
    selectedPriceRange,
    selectedProductName,
  ]);
  const filterProduct = () => {
    const listFilteredProduct = [];
    const priceRangeValues = getPriceRangeValues(selectedPriceRange);
    const minPrice = priceRangeValues.minPrice;
    const maxPrice = priceRangeValues.maxPrice;
    products.forEach((product) => {
      if (
        product.productName.toLowerCase().includes(selectedProductName.toLowerCase()) &&
        (selectedCategory === "Tất cả" ||
          product.categoryListName.includes(selectedCategory)) &&
        (selectedBrand === "Tất cả" || product.brandName === selectedBrand) &&
        product.salePrice >= minPrice &&
        product.salePrice <= maxPrice
      ) {
        listFilteredProduct.push(product);
      }
    });
    setFilterProduct(listFilteredProduct);
  };
  const handleAddToCartClick = (product) => {
    if (window.localStorage.getItem("role") === "guest") {
      toast.info("Vui lòng đăng nhập để sử dụng");
    } else {
      setAddToCartProduct(product);
      handleOpenAddToCart();
    }
  };
  const handleOpenAddToCart = () => {
    setAddToCartOpen(true);
  };
  const handleCloseAddToCart = () => {
    setAddToCartOpen(false);
  };
  function getPriceRangeValues(priceRange) {
    switch (priceRange) {
      case "0-500.000":
        return { minPrice: 0, maxPrice: 500000 };
      case "500.000-1.000.000":
        return { minPrice: 500000, maxPrice: 1000000 };
      case "1.000.000-2.000.000":
        return { minPrice: 1000000, maxPrice: 2000000 };
      case "2.000.000+":
        return { minPrice: 2000000, maxPrice: Number.MAX_SAFE_INTEGER };
      default:
        return { minPrice: 0, maxPrice: Number.MAX_SAFE_INTEGER };
    }
  }
  return (
    <>
      <div className="ml-[40px] w-[280px] bg-slate-100 h-screen">
        <div className="ml-[60px]"></div>
        <p className="text-2xl text-center font-semibold mt-1">
          Bộ lọc sản phẩm
        </p>
        <div className="ml-5 flex flex-col">
          <p className="font-semibold">Tìm kiếm theo tên: </p>
          <input
            type="text"
            placeholder="Nhập tên sản phẩm"
            value={selectedProductName}
            onChange={(e) => setSelectedProductName(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          />
        </div>
        <p className="text-base text-center font-medium mt-1">Nhãn hiệu</p>
        <div className="ml-5 flex flex-col p-2">
          {brands.map((brand, index) => (
            <label key={index}>
              <input
                type="radio"
                name="brand"
                value={brand.brandName}
                checked={selectedBrand === brand.brandName}
                onChange={() => setSelectedBrand(brand.brandName)}
              />
              {brand.brandName}
            </label>
          ))}
        </div>

        <p className="text-base text-center font-medium mt-1">Danh mục</p>
        <div className="ml-5 flex flex-col p-2">
          {categories.map((category, index) => (
            <label key={index}>
              <input
                type="radio"
                name="category"
                value={category.categoryName}
                checked={selectedCategory === category.categoryName}
                onChange={() => setSelectedCategory(category.categoryName)}
              />
              {category.categoryName}
            </label>
          ))}
        </div>

        <p className="text-base text-center font-medium mt-1">Giá (VNĐ)</p>
        <div className="ml-5 flex flex-col p-2">
          {priceRanges.map((range, index) => (
            <label key={index}>
              <input
                type="radio"
                name="price"
                value={range}
                checked={selectedPriceRange === range}
                onChange={() => setSelectedPriceRange(range)}
              />
              {range}
            </label>
          ))}
        </div>
      </div>
      <div className="ml-4 mt-4 grid grid-cols-4 gap-4 mt-3">
        {filterProducts &&
          filterProducts.map((product) => (
            <div className="h-50 w-50 bg-white ">
              <Link to={"/product/" + product.id}>
                <img
                  className="h-40 w-36 object-cover hover:scale-125 duration-300"
                  src={product.imagesList[0].link}
                  alt=""
                />
              </Link>
              <div className="px-2 py-3">
                <span className="text-gray-400 uppercase text-sm">
                  {product.brandName}
                </span>
                <p className="text-sm font-bold block truncate capitalize">
                  {product.productName}
                </p>
                <div className="flex flex-row">
                  {product.averageRate > 0 ? (
                    <>
                      <p className="font-semibold">{product.averageRate}</p>
                      <IconStar />
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">Chưa có đánh giá</p>
                    </>
                  )}
                </div>
                <div className="flex items-center">
                  <p className="text-sm font-semibold my-3">
                    {product.salePrice} VND
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 ml-2">
                      {product.price} VND
                    </p>
                  </del>
                  <div
                    className="ml-3 hover:cursor-pointer"
                    onClick={() => handleAddToCartClick(product)}
                  >
                    <IconCart />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {isAddToCartOpen && (
        <AddToCart
          user={user}
          product={addToCartProduct}
          handleOpenAddToCart={handleOpenAddToCart}
          handleCloseAddToCart={handleCloseAddToCart}
        ></AddToCart>
      )}
    </>
  );
}

export default ProductList;
