import React, { useEffect, useState } from "react";
import { request } from "../../../axios_helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function EditOrder({ user, order, closeEditOrderModal }) {
  const navigate = useNavigate();
  const orderStatus = [
    "Chờ đóng gói",
    "Đóng gói xong",
    "Đã giao cho đơn vị vận chuyển",
    "Giao thành công",
    "Giao thất bại",
  ];
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(order.status);
  const handleUpdateOrderStatus = () => {
    const data = {
      status: selectedOrderStatus,
    };
    request("PUT", `/api/v1/orders/${order.id}`, data)
      .then((response) => {
        if (response.data.status === "200") {
          closeEditOrderModal();
          toast.success(response.data.message);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
        toast.error("Cập nhật trạng thái đơn hàng thất bại");
      });
  };
  return (
    <div className="fixed inset-0 overflow-y-scroll bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="flex justify-center items-center h-screen flex-col mt-[250px]">
        <button
          className="text-white text-xl place-self-end"
          onClick={closeEditOrderModal}
        >
          X
        </button>
        <div className="p-2 border border-blue-300 rounded bg-white">
          <h2 className="font-bold text-center">Cập nhật đơn hàng</h2>

          <p className="font-bold">Tên người nhận: {order.nameReceiver}</p>
          <p className="font-bold">
            Số điện thoại người nhận: {order.phoneReceiver}
          </p>

          <p className="font-bold">
            Địa chỉ người nhận: {order.addressReceiver}
          </p>
          <p className="font-bold">Ghi chú: {order.note}</p>
          <div className="flex flex-col">
            <p className="font-bold">Mã khuyến mãi: {order.promotionName}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">
              Phương thức vận chuyển: {order.shipmentUnit}
            </p>
            <p className="font-bold"></p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">
              Phương thức thanh toán: {order.paymentName}
            </p>
            <p className="font-bold">Sản phẩm</p>
            {order.ordersItems.map((item) => (
              <div className="flex flex-row gap-5">
                <img
                  className="h-20 w-18 object-cover"
                  src={item.urlImagesList[0]}
                  alt=""
                />

                <div className="flex flex-col">
                  <p>{item.productName}</p>
                  <p>
                    Kích cỡ: {item.size} Số lượng: {item.quantity}
                  </p>
                </div>
                <p>Đơn giá: {item.salePrice}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold">Tổng tiền sản phẩm</p>
            <p className="font-bold">{order.totalPrice}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold">Tiền vận chuyển</p>
            <p className="font-bold">{order.shipmentCost}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold">Giá được giảm</p>
            <p className="font-bold">-{order.discountValue}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold text-red-400">Thành tiền</p>
            <p className="font-bold text-red-400">{order.totalPay}</p>
          </div>
          <p className="font-bold">Cập nhật trạng thái đơn hàng</p>
          <select
            value={selectedOrderStatus}
            onChange={(e) => setSelectedOrderStatus(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            {orderStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            onClick={handleUpdateOrderStatus}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Cập nhật đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditOrder;
