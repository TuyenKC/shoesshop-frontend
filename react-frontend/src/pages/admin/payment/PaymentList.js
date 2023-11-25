import React from "react";
import { useState, useEffect } from "react";
import { request } from "../../../axios_helper";
import AddPayment from "./AddPayment";
import EditPayment from "./EditPayment";
import { toast } from "react-toastify";
import ConfirmDelete from "../../../components/ConfỉmDelete";
import IconEdit from "../../../static/icons/IconEdit";
import IconDelete from "../../../static/icons/IconDelete";
function PaymentList() {
  const [isAddPaymentModalOpen, setAddPaymentModal] = useState(false);
  const [isEditPaymentModalOpen, setEditPaymentModal] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteModal] = useState(false);
  const [filterPaymentList, setFilterPaymentList] = useState([]);
  const [selectedPaymentName, setSelectedPaymentName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [editPayment, setEditPayment] = useState();
  const [payments, setPayments] = useState([]);
  const openEditPaymentModel = () => {
    setEditPaymentModal(true);
  };
  const closeEditPaymentModal = () => {
    setEditPaymentModal(false);
  };
  const openAddPaymentModel = () => {
    setAddPaymentModal(true);
  };
  const closeAddPaymentModal = () => {
    setAddPaymentModal(false);
  };
  const updateEditPayment = (payment) => {
    setEditPaymentModal(true);
    setEditPayment(payment);
  };
  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModal(false);
  };
  const openConfirmDeleteModal = (payment) => {
    setConfirmDeleteModal(true);
    setEditPayment(payment);
  };
  const getPaymentList = () => {
    request("GET", "/api/v1/payment", {})
      .then((response) => {
        if (response.data.status === "200") {
          setPayments(response.data.data);
          setFilterPaymentList(response.data.data);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: " + error);
      });
  };
  useEffect(() => {
    getPaymentList();
  }, [isConfirmDeleteOpen]);
  const handleFilter = () => {
    let filterList = [];
    payments.forEach((payment) => {
      if (
        (payment.paymentName.toLowerCase().includes(selectedPaymentName.toLowerCase()) ||
          selectedPaymentName === "Tất cả") &&
        (selectedStatus === "Tất cả" || payment.status === selectedStatus)
      ) {
        filterList.push(payment);
      }
    });
    setFilterPaymentList(filterList);
  };
  useEffect(() => {
    handleFilter();
  }, [selectedPaymentName, selectedStatus]);
  return (
    <div className="ml-[40px] p-2">
      <h2 className="p-2 text-2xl font-semibold">
        Danh sách phương thức thanh toán
      </h2>
      <button
        className="m-2 p-1 ring-2 text-sm bg-green-600 text-white outline rounded"
        onClick={openAddPaymentModel}
      >
        Thêm phương thức thanh toán
      </button>
      <div className="m-2 flex flex-row gap-2">
        <div className="flex flex-col">
          <p className="font-semibold">Tìm kiếm theo tên: </p>
          <input
            type="text"
            placeholder="Nhập tên phương thức thanh toán"
            value={selectedPaymentName}
            onChange={(e) => setSelectedPaymentName(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Chọn trạng thái</p>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>
      </div>
      <table className="m-2 border-collapse border">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2 border-collapse border">STT</th>
            <th className="p-2 border-collapse border">Tên</th>
            <th className="p-2 border-collapse border">Mô tả</th>
            <th className="p-2 border-collapse border">Trạng thái</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filterPaymentList &&
            filterPaymentList.map((payment, index) => (
              <tr className="bg-gray-100" key={payment.id}>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {index + 1}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {payment.paymentName}
                </td>
                <td className="p-3 text-sm text-gray-700 border-collapse border">
                  {payment.description}
                </td>
                <td
                  className={
                    payment.status === "Active"
                      ? "p-3 border-collapse border text-sm font-bold text-green-800 "
                      : "p-3 border-collapse border text-sm font-bold text-red-800"
                  }
                >
                  {payment.status}
                </td>
                <td className="pt-3 flex justify-center hover:cursor-pointer">
                  <div
                    onClick={() => updateEditPayment(payment)}
                    className="hover:cursor-pointer"
                  >
                    <IconEdit />
                  </div>
                  <div
                    onClick={() => openConfirmDeleteModal(payment)}
                    className="hover:cursor-pointer"
                  >
                    <IconDelete />
                  </div>
                </td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
      {isAddPaymentModalOpen && (
        <AddPayment
          openAddPaymentModel={openAddPaymentModel}
          closeAddPaymentModal={closeAddPaymentModal}
          getPaymentList={getPaymentList}
        />
      )}
      {isEditPaymentModalOpen && (
        <EditPayment
          openEditPaymentModel={openEditPaymentModel}
          closeEditPaymentModal={closeEditPaymentModal}
          editPayment={editPayment}
          getPaymentList={getPaymentList}
        />
      )}
      {isConfirmDeleteOpen && (
        <ConfirmDelete
          closeConfirmDeleteModal={closeConfirmDeleteModal}
          field="payment"
          id={editPayment.id}
        ></ConfirmDelete>
      )}
    </div>
  );
}

export default PaymentList;
