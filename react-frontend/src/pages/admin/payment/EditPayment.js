import React, { useState } from "react";
import { request } from "../../../axios_helper";
import { toast } from "react-toastify";
import { validatePaymentName } from "../../../components/Validate";
function EditPayment({
  closeEditPaymentModal,
  openEditPaymentModal,
  editPayment,
  getPaymentList,
}) {
  const [name, setName] = useState(editPayment.paymentName);
  const [description, setDescription] = useState(editPayment.description);
  const [status, setStatus] = useState(editPayment.status);
  const handleEditPayment = () => {
    if (validatePaymentName(name)) {
      const data = {
        paymentName: name,
        description: description,
        status: status,
      };
      request("PUT", `/api/v1/payment/${editPayment.id}`, data)
        .then((response) => {
          if (response.data.status === "200") {
            getPaymentList();
            closeEditPaymentModal();
            toast.success(response.data.message);
          } else {
            toast.warning(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Lỗi khi gọi API: " + error);
        });
    }
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={closeEditPaymentModal}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">
          <p className="text-xl text-center mb-4 font-bold">
            Chỉnh sửa phương thức thanh toán
          </p>
          <p className="font-bold">Tên phương thức thanh toán</p>
          <input
            type="text"
            placeholder="Tên phương thức"
            value={name}
            onChange={handleNameChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-bold">Mô tả phương thức thanh toán</p>
          <input
            type="text"
            placeholder="Mô tả"
            value={description}
            onChange={handleDescriptionChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-bold">Trạng thái phương thức thanh toán</p>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full mb-4 px-2 border border-gray-400"
          >
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select>
          <button
            className="bg-blue-500 text-white p-2 rounded mt-4"
            onClick={handleEditPayment}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditPayment;
