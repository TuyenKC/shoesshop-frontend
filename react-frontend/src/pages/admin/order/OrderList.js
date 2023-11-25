import React from "react";
import { useState, useEffect } from "react";
import { request } from "../../../axios_helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddOrder from "./AddOrder";
import EditOrder from "./EditOrder";
import { toast } from "react-toastify";
function OrderList({ user }) {
  const [isAddOrderModalOpen, setAddOrderModal] = useState(false);
  const [isEditOrderModalOpen, setEditOrderModal] = useState(false);
  const [filterOrderList, setFilterOrderList] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [startDate, setStartDate] = useState(new Date("01-01-2023"));
  const [endDate, setEndDate] = useState(new Date());
  const [editOrder, setEditOrder] = useState();
  const [orderList, setOrderList] = useState([]);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    request("GET", `/api/v1/orders`, {})
      .then((response) => {
        if (response.data.status === "200") {
          setOrderList(response.data.data);
          setFilterOrderList(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        toast.warning("Không lấy được danh sách đơn hàng");
      });
  }, [isEditOrderModalOpen,isAddOrderModalOpen]);
  useEffect(() => {
    request("GET", "/api/v1/payment", {})
      .then((response) => {
        if (response.data.status === "200") {
          setPayments(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API lấy danh sách payment: " + error);
      });
  }, []);
  const openEditOrderModel = () => {
    setEditOrderModal(true);
  };
  const openAddOrderModel = () => {
    setAddOrderModal(true);
  };
  const closeAddOrderModal = () => {
    setAddOrderModal(false);
  };
  const updateEditOrder = (order) => {
    setEditOrderModal(true);
    setEditOrder(order);
  };
  const closeEditOrderModal = () => {
    setEditOrderModal(false);
  };
  const openEditOrderModal = (order) => {
    setEditOrderModal(true);
    setEditOrder(order);
  };
  const handleFilter = () => {
    let filterList = [];
    orderList.forEach((order) => {
      if (
        (order.paymentName === selectedPayment ||
          selectedPayment === "Tất cả") &&
        (selectedStatus === "Tất cả" || order.status === selectedStatus) &&
        new Date(order.createdAt) <= endDate &&
        new Date(order.createdAt) >= startDate
      ) {
        filterList.push(order);
      }
    });
    setFilterOrderList(filterList);
  };
  useEffect(() => {
    handleFilter();
  }, [selectedPayment, selectedStatus, startDate, endDate]);
  return (
    <div className="ml-[40px] p-2">
      <h2 className="p-2 text-2xl font-semibold">Danh sách đơn hàng</h2>
      <button
        className="m-2 p-1 ring-2 text-sm bg-green-600 text-white outline rounded"
        onClick={openAddOrderModel}
      >
        Thêm đơn hàng
      </button>
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
        <div className="flex flex-col">
          <p className="font-bold">Chọn phương thức thanh toán</p>
          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="Tất cả">Tất cả</option>
            {payments &&
              payments.map((payment) => (
                <option key={payment.paymentName} value={payment.paymentName}>
                  {payment.paymentName}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Chọn ngày bắt đầu</p>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full mb-4 px-2 border border-gray-400"
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày bắt đầu"
            aria-label="Ngày bắt đầu"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Chọn ngày kết thúc</p>
          <DatePicker
            id="startDate"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="w-full mb-4 px-2 border border-gray-400"
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày kết thúc"
            aria-label="Ngày kết thúc"
          />
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
            <th className="p-2 border-collapse border">Trạng thái đơn hàng</th>
            <th className="p-2 border-collapse border">
              Phương thức thanh toán
            </th>
            <th className="p-2 border-collapse border">Ngày đặt</th>
            <th className="p-2 border-collapse border">Tổng tiền thanh toán</th>
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
                {order.paymentName}
              </td>
              <td className="p-3 text-sm text-gray-700 border-collapse border">
                {order.createdAt}
              </td>
              <td className="p-3 text-sm text-gray-700 border-collapse border">
                {order.totalPay}
              </td>
              <td
                onClick={() => openEditOrderModal(order)}
                className="pt-3 flex justify-center hover:cursor-pointer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="8"
                    y="4"
                    width="32"
                    height="40"
                    rx="2"
                    fill="none"
                    stroke="#333"
                    stroke-width="4"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 14H33"
                    stroke="#333"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 24H33"
                    stroke="#333"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 34H33"
                    stroke="#333"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15 16C16.1046 16 17 15.1046 17 14C17 12.8954 16.1046 12 15 12C13.8954 12 13 12.8954 13 14C13 15.1046 13.8954 16 15 16Z"
                    fill="#333"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15 26C16.1046 26 17 25.1046 17 24C17 22.8954 16.1046 22 15 22C13.8954 22 13 22.8954 13 24C13 25.1046 13.8954 26 15 26Z"
                    fill="#333"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15 36C16.1046 36 17 35.1046 17 34C17 32.8954 16.1046 32 15 32C13.8954 32 13 32.8954 13 34C13 35.1046 13.8954 36 15 36Z"
                    fill="#333"
                  />
                </svg>
              </td>
            </tr>
          ))}
      </table>
      {isEditOrderModalOpen && (
        <EditOrder
          order={editOrder}
          closeEditOrderModal={closeEditOrderModal}
        ></EditOrder>
      )}
      {isAddOrderModalOpen && (
        <AddOrder
          user={user}
          closeAddOrderModal={closeAddOrderModal}
        ></AddOrder>
      )}
    </div>
  );
}

export default OrderList;
