import React, { useState, useEffect } from "react";
import Rating from "react-rating-stars-component";
import { request } from "../../../axios_helper";
import {toast} from "react-toastify";
import "../../../index.css";
function RateProduct({user, selectedOrdersItem, handleCloseRateProduct}) {
  const [rating, setRating] = useState(0);
  const [usersId, setUsersId] = useState();
  useEffect(() => {
    request("GET", `/api/v1/users/username/${user.username}`, {})
      .then((response) => {
            setUsersId(response.data.data.id);
      })
      .catch((error) => {
        toast.warning("Không lấy được thông tin người dùng");
      });
  },[])
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const handleRateProduct = () => {
    const data = {
        userId: usersId,
        star: rating,
        productId: selectedOrdersItem.productId,
        ordersItemId: selectedOrdersItem.id
    }
    request("POST","/api/v1/rate",data)
        .then((response) => {
            toast.success("Đánh giá sản phẩm thành công");
            handleCloseRateProduct();
            
        })
        .catch((error) => {
            toast.error("Đánh giá sản phẩm thất bại. Vui lòng thử lại");
            console.log("Loi khi goi API: " + error)
        })
  }

  return (
    <div className="modal z-50">
    <div className="flex justify-center items-center h-screen flex-col">
    <button className="modal-icon-close" onClick={handleCloseRateProduct} >
        X
    </button>
    <div className="modal-container bg-white">
    <h1 className="p-2 font-bold">Đánh giá sản phẩm</h1>
      <Rating classNames="m-2"
        count={5} 
        value={rating} 
        size={24} 
        activeColor="#ffd700"
        emptyIcon={<i className="far fa-star"></i>}
        fullIcon={<i className="fa fa-star"></i>} 
        onChange={handleRatingChange}
      />
      <button onClick={handleRateProduct} className="button-submit">Đánh giá</button>
    </div>  
    
    </div>
    </div>
    
  );
}

export default RateProduct;
