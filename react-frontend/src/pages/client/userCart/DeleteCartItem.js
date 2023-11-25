import React, { useState, useEffect } from "react";
import { request } from "../../../axios_helper";
import { toast } from 'react-toastify';

function DeleteCartItem({editItem, handleCloseDeleteCartItem}){
   
    const handleDeteleItem = () => {
      request("DELETE", `/api/v1/cartitem/${editItem.id}`, {} )
      .then((response) => {
        if (response.data.status === "200") {
          toast.success(response.data.message);
          handleCloseDeleteCartItem();
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        toast.warning("Xóa khỏi giỏ hàng thất bại");
      });
    }
    return(
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={handleCloseDeleteCartItem}>
          X
        </button>
        <div className="bg-white p-2 rounded">
          <p className="text-xl text-center mb-4">Bạn có muốn xóa sản phẩm khỏi giỏ hàng?</p>
          <div className="flex justify-evenly">
          <button className="bg-red-500 text-white p-2 rounded mt-4" onClick={handleDeteleItem}>
            Xác nhận
          </button>
          <button className="bg-gray-500 text-white p-2 rounded mt-4" onClick={handleCloseDeleteCartItem}>
            Hủy
          </button>
          </div>
          
        </div>
      </div>
    </div>
    )
}
export default DeleteCartItem;