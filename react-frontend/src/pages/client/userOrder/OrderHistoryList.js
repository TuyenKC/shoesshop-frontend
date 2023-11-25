import React, { useEffect, useState } from "react";
import { request } from "../../../axios_helper";
import { toast } from "react-toastify";
import DetailOrder from "./DetailOrder";
import IconDetail from "../../../static/icons/IconDetail";

function OrderHistoryList({ user }) {
  const [orderList, setOrderList] = useState([]);
  const [isDetailOrderModal, setDetailOrderModalOpen] = useState(false);
  const [filterOrderList, setFilterOrderList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [selectedOrder, setSelectedOrder] = useState();
  useEffect(() => {
    request("GET", `/api/v1/orders/orderhistory/${user.username}`, {})
      .then((response) => {
        if (response.data.status === "200") {
          setOrderList(response.data.data);
          setFilterOrderList(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        toast.warning("Không lấy được lịch sử người dùng");
      });
  }, [isDetailOrderModal]);
  const handleOpenDetailOrder = (order) => {
    setDetailOrderModalOpen(true);
    setSelectedOrder(order);
  };
  const handleCloseDetailOrder = () => {
    setDetailOrderModalOpen(false);
  };
  const handleFilter = () => {
    let filterList = [];
    orderList.forEach((order) => {
      if (selectedStatus === "Tất cả" || order.status === selectedStatus) {
        filterList.push(order);
      }
    });
    setFilterOrderList(filterList);
  };
  useEffect(() => {
    handleFilter();
  }, [selectedStatus]);
  return (
    <>
      <div className="ml-[40px] h-screen">
        <p className="p-2 font-bold">Lịch sử đơn hàng</p>
        <div className="m-2 flex flex-row gap-2">
          <div className="flex flex-col">
            <p className="font-bold">Chọn trạng thái đơn hàng</p>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full mb-4 px-2 border border-gray-400"
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Chờ đóng gói">Chờ đóng gói</option>
              <option value="Đóng gói xong">Đóng gói xong</option>
              <option value="Đóng gói xong">Đóng gói xong</option>
              <option value="Giao thành công">Giao thành công</option>
              <option value="Giao thất bại">Giao thất bại</option>
            </select>
          </div>
        </div>
        <table className="text-sm m-2 border-collapse border">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-2 border-collapse border">STT</th>
              <th className="p-2 border-collapse border">ID đơn hàng</th>
              <th className="p-2 border-collapse border">Tên người nhận</th>
              <th className="p-2 border-collapse border">SĐT người nhận</th>
              <th className="p-2 border-collapse border">Địa chỉ người nhận</th>
              <th className="p-2 border-collapse border">
                Trạng thái đơn hàng
              </th>
              <th className="p-2 border-collapse border">
                Trạng thái thanh toán
              </th>
              <th className="p-2 border-collapse border">Ngày đặt</th>
              <th className="p-2 border-collapse border">
                Tổng tiền thanh toán
              </th>
              <th className="p-2">Hành động</th>
            </tr>
          </thead>
          {filterOrderList &&
            filterOrderList.map((order, index) => (
              <tr className="bg-gray-100" key={order.id}>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {index + 1}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {order.id}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {order.nameReceiver}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {order.phoneReceiver}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {order.addressReceiver}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {order.status}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {order.paymentStatus}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {order.createdAt}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {order.totalPay}
                </td>
                <td
                  onClick={() => handleOpenDetailOrder(order)}
                  className="pt-3 flex justify-center hover:cursor-pointer"
                >
                  <IconDetail />
                </td>
              </tr>
            ))}
        </table>
        {isDetailOrderModal && (
          <DetailOrder
            user={user}
            order={selectedOrder}
            handleCloseDetailOrder={handleCloseDetailOrder}
          ></DetailOrder>
        )}
      </div>
    </>
  );
}
export default OrderHistoryList;
