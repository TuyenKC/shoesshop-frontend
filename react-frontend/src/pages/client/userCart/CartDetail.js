import React, { useState, useEffect } from "react";
import { request } from "../../../axios_helper";
import { toast } from "react-toastify";
import DeleteCartItem from "./DeleteCartItem";
import UpdateCartItem from "./UpdateCartItem";
import MakeOrder from "../userOrder/MakeOrder";
import { validateItemList } from "../../../components/Validate";
import IconEdit from "../../../static/icons/IconEdit";
import IconDelete from "../../../static/icons/IconDelete";
function CartDetail({ user }) {
  const [cartItemList, setCartItemList] = useState();
  const [isDeleteCartItemOpen, setDeleteCartItemOpen] = useState(false);
  const [isUpdateCartItemOpen, setUpdateCartItemOpen] = useState(false);
  const [isMakeOrderOpen, setMakeOrderOpen] = useState(false);
  const [editItem, setEditItem] = useState();
  useEffect(() => {
    request("GET", `/api/v1/cart/${user.cartId}`, {})
      .then((response) => {
        if (response.data.status === "200") {
          setCartItemList(response.data.data.cartItemList);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        toast.warning("Không lấy được giỏ hàng người dùng");
      });
  }, [isDeleteCartItemOpen, isUpdateCartItemOpen]);
  const handleOpenDeleteCartItem = (cartItem) => {
    setDeleteCartItemOpen(true);
    setEditItem(cartItem);
  };
  const handleCloseDeleteCartItem = () => {
    setDeleteCartItemOpen(false);
  };
  const handleOpenUpdateCartItem = (cartItem) => {
    setUpdateCartItemOpen(true);
    setEditItem(cartItem);
  };
  const handleCloseUpdateCartItem = () => {
    setUpdateCartItemOpen(false);
  };
  const handleOpenMakeOrder = () => {
    if (validateItemList(cartItemList)) setMakeOrderOpen(true);
  };
  const handleCloseMakeOrder = () => {
    setMakeOrderOpen(false);
  };
  return (
    <>
      <div className="ml-[40px] h-screen">
        <p className="p-2 font-bold">Giỏ hàng của bạn</p>
        <table className="m-2 border-collapse border">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-2 border-collapse border">STT</th>
              <th className="p-2 border-collapse border">Tên sản phẩm</th>
              <th className="p-2 border-collapse border">Kích cỡ</th>
              <th className="p-2 border-collapse border">Số lượng</th>
              <th className="p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {cartItemList &&
              cartItemList.map((cartItem, index) => (
                <tr className="bg-gray-100" key={cartItem.id}>
                  <td className="p-3 text-sm text-gray-700 border-collapse border">
                    {index + 1}
                  </td>
                  <td className="p-3 text-sm text-gray-700 border-collapse border">
                    {cartItem.productName}
                  </td>
                  <td className="p-3 text-sm text-gray-700 border-collapse border">
                    {cartItem.size}
                  </td>
                  <td className="p-3 text-sm text-gray-700 border-collapse border">
                    {cartItem.quantity}
                  </td>
                  <td>
                    <td className="pt-3 flex justify-evenly">
                      <div
                        onClick={() => handleOpenUpdateCartItem(cartItem)}
                        className="hover:cursor-pointer w-6 h-6"
                      >
                        <IconEdit />
                      </div>
                      <div
                        onClick={() => handleOpenDeleteCartItem(cartItem)}
                        className="hover:cursor-pointer w-6 h-6"
                      >
                        <IconDelete />
                      </div>
                    </td>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button
          onClick={handleOpenMakeOrder}
          className="m-2 p-1 ring-2 text-sm bg-green-600 text-white outline rounded"
        >
          Đặt hàng
        </button>
        {isDeleteCartItemOpen && (
          <DeleteCartItem
            editItem={editItem}
            handleCloseDeleteCartItem={handleCloseDeleteCartItem}
          />
        )}
        {isUpdateCartItemOpen && (
          <UpdateCartItem
            editItem={editItem}
            handleCloseUpdateCartItem={handleCloseUpdateCartItem}
          />
        )}
        {isMakeOrderOpen && (
          <MakeOrder
            user={user}
            cartItemList={cartItemList}
            handleCloseMakeOrder={handleCloseMakeOrder}
          />
        )}
      </div>
    </>
  );
}
export default CartDetail;
