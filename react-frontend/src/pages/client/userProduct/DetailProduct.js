import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../../axios_helper";
import { useAuth } from "../../AuthProvider";
import SideBarHome from "../../SideBarHome";
import AddToCart from "../userCart/AddToCart";
import { toast } from "react-toastify";
import IconStar from "../../../static/icons/IconStar";
function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const { user, handleLogin, handleLogout } = useAuth();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addToCartProduct, setAddToCartProduct] = useState();
  const [isAddToCartOpen, setAddToCartOpen] = useState(false);
  useEffect(() => {
    request("GET", `/api/v1/product/${id}`, {})
      .then((response) => {
        if (response.data.status === "200") {
          setProduct(response.data.data);
          setSelectedImage(response.data.data.imagesList[0].link);
          setAddToCartProduct(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  }, []);
  const handleImageSelect = (selectedLink, index) => {
    setSelectedImage(selectedLink);
    setSelectedImageIndex(index);
  };
  const handleOpenAddToCart = () => {
    if (window.localStorage.getItem("role") === "guest") {
      toast.info("Vui lòng đăng nhập để sử dụng");
    } else setAddToCartOpen(true);
  };
  const handleCloseAddToCart = () => {
    setAddToCartOpen(false);
  };
  return (
    <div className="w-full h-screen flex overflow-y-auto">
      <SideBarHome
        user={user}
        handleLoginSuccess={handleLogin}
        handleLogout={handleLogout}
      />
      <div className="p-2 mt-[40px] ml-[50px] ">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <img
              className="w-[400px] h-[400px] hover:scale-105 duration-300 ring-2 ring-gray-200"
              src={selectedImage}
              alt=""
            />
            <div className="mt-6 flex flex-row">
              {product.imagesList &&
                product.imagesList.map((image, index) => (
                  <img
                    key={image.id}
                    className={`h-20 w-18 ml-2 ${
                      selectedImageIndex === index ? "ring-2 ring-blue-600" : ""
                    }`}
                    src={image.link}
                    alt=""
                    onClick={() => handleImageSelect(image.link, index)}
                  />
                ))}
            </div>
          </div>
          <div className="ml-4 p-2">
            <p className="text-lg">Thương hiệu: {product.brandName}</p>
            <hr className="mt-4"></hr>
            <div className="flex flex-col">
              <p className="mt-4 font-bold text-2xl">{product.productName}</p>
              {product.averageRate > 0 ? (
                <div className="flex flex-row">
                  <p className="ml-2 mt-4 font-semibold text-2xl">
                    ({product.averageRate}
                  </p>
                  <div className="mt-5">
                      <IconStar/>
                  </div>
                  <p className="mt-4 font-semibold text-2xl">)</p>
                </div>
              ) : (
                <>
                  <p className="ml-2 mt-4 font-semibold text-2xl">
                    (Chưa có đánh giá)
                  </p>
                </>
              )}
            </div>
            <div className="mt-4 flex flex-row">
              {product.categoryListName &&
                product.categoryListName.map((category) => (
                  <div className="border rounded-full bg-green-700 text-white">
                    <p className="p-2 text-sm font-semibold">{category}</p>
                  </div>
                ))}
            </div>
            <div className="mt-4 flex flex-row">
              <p className="text-xl font-semibold text-green-500">
                {product.salePrice}đ{" "}
              </p>
              <del>
                <p className="text-xl text-gray-600 ml-2">{product.price}đ</p>
              </del>
            </div>
            <hr className="mt-4"></hr>
            <div className="p-2 mt-2">
              <button
                onClick={handleOpenAddToCart}
                className="p-2 text-white rounded-xl bg-blue-600"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
        <div className="p-2 mt-2">
          <p className="font-bold text-xl">Mô tả sản phẩm</p>
          <p className="font-semibold text-base">{product.description}</p>
        </div>
        <div className="p-2 mt-2">
          <p className="font-bold text-xl">
            Đánh giá sản phẩm (
            {product.rateList === undefined ? 0 : product.rateList.length})
          </p>

          {product.rateList &&
            product.rateList.map((rate) => (
              <div className="flex flex-row">
                <p className="font-semibold text-base">
                  {rate.username} đánh giá sản phẩm {rate.star}{" "}
                </p>
                <IconStar/>
                <p>vào ngày {rate.createdAt}</p>
              </div>
            ))}
        </div>
        <hr className="mt-4"></hr>
      </div>
      {isAddToCartOpen && (
        <AddToCart
          user={user}
          product={addToCartProduct}
          handleOpenAddToCart={handleOpenAddToCart}
          handleCloseAddToCart={handleCloseAddToCart}
        ></AddToCart>
      )}
    </div>
  );
}
export default DetailProduct;
