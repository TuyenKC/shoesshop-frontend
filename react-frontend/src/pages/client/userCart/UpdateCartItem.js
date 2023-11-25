import React, { useState, useEffect } from "react";
import { request } from "../../../axios_helper";
import { toast } from "react-toastify";

function UpdateCartItem({ editItem, handleCloseUpdateCartItem }) {
  const [quantity, setQuantity] = useState(editItem.quantity);
  const [quantityInStock, setQuantityInStock] = useState(
    editItem.quantityInStock
  );
  const handleDeteleItem = () => {
    request("PUT", `/api/v1/cartitem/${editItem.id}`, { quantity: quantity })
      .then((response) => {
        if (response.data.status === "200") {
          toast.success(response.data.message);
          handleCloseUpdateCartItem();
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        toast.warning("Cập nhật giỏ hàng thất bại");
      });
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={handleCloseUpdateCartItem}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">
          <p className="text-xl text-center mb-4">Cập nhật số lượng sản phẩm</p>
          <p className="font-bold">
            {" "}
            Số lượng hàng còn trong kho: {quantityInStock}
          </p>
          <div className="flex items-center">
            <button onClick={() => setQuantity(Math.max(quantity - 1, 1))}>
              -
            </button>
            <span className="mx-2">{quantity}</span>
            <button
              onClick={() =>
                setQuantity(Math.min(quantityInStock, quantity + 1))
              }
            >
              +
            </button>
          </div>
          <div className="flex justify-evenly">
            <button
              className="bg-green-500 text-white p-2 rounded mt-4"
              onClick={handleDeteleItem}
            >
              Cập nhật
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded mt-4"
              onClick={handleCloseUpdateCartItem}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateCartItem;
