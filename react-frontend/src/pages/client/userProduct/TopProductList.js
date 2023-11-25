import React, { useState } from "react";
import { useEffect } from "react";
import { request } from "../../../axios_helper";
import { toast } from 'react-toastify';
import AddToCart from "../userCart/AddToCart";
import Rating from "react-rating-stars-component";
import { Link } from "react-router-dom";
import IconStar from "../../../static/icons/IconStar";
import IconCart from "../../../static/icons/IconCart";
function TopProductList({user, field}) {
  const [products, setProducts] = useState([]);
  const [addToCartProduct, setAddToCartProduct] = useState();
  const [isAddToCartOpen, setAddToCartOpen] = useState(false);
  const limitedProduct = 8; 
  useEffect(() => {
    request("GET",`/api/v1/product/${field}`,{})
    .then((response) => {
      let productList = response.data.data;
      setProducts(productList.slice(0,Math.min(limitedProduct,productList.length)));
    })
    .catch((error) => {
      console.log("Loi khi goi API: " + error)
    })
  },[])
  const handleAddToCartClick = ((product) => {
      if(window.localStorage.getItem("role") === "guest"){
        toast.info("Vui lòng đăng nhập để sử dụng");
      }else{
        setAddToCartProduct(product);
        handleOpenAddToCart();
      }
  })
  const handleOpenAddToCart = (() => {
    setAddToCartOpen(true);
  })  
  const handleCloseAddToCart = (() => {
    setAddToCartOpen(false);
  })  
  return (
    <>
    <div className="grid grid-cols-4 gap-4 mt-3">
    {products && products.map(product => (
        <div className="p-4 h-50 w-50 bg-white ">
          <Link to={"/product/" + product.id}>
              <img className="h-40 w-36 object-cover hover:scale-125 duration-300" src={product.imagesList[0].link} alt=""/>
          </Link>
            <div className="px-2 py-3">
                <span className="text-gray-400 uppercase text-sm">
                    {product.brandName}
                </span>
                <p className="text-sm font-bold block truncate capitalize">{product.productName}</p>
                <div className="flex flex-row">
                {product.averageRate > 0 ? 
                  <>
                  <p className="font-semibold">{product.averageRate}</p>
                  <IconStar/>
                  </>
                : <><p className="font-semibold">Chưa có đánh giá</p></>}             
                </div>
                <div className="flex items-center">
                    <p className="text-sm font-semibold my-3">{product.salePrice} VND</p>
                    <del>
                        <p className="text-sm text-gray-600 ml-2">{product.price} VND</p>
                    </del>
                    <div className="ml-3 hover:cursor-pointer" onClick={() => handleAddToCartClick(product)}>
                        <IconCart/>
                    </div>
                </div>
                </div>
        </div>
    ))}
    </div>
    {isAddToCartOpen && <AddToCart user = {user} product = {addToCartProduct} handleOpenAddToCart = {handleOpenAddToCart} handleCloseAddToCart={handleCloseAddToCart}></AddToCart> }
    </>
  );
}

export default TopProductList;
