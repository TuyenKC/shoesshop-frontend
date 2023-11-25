import React, { useState } from "react";
import { request } from "../../../axios_helper";
import { toast } from "react-toastify";
import {
  validateShipmentCost,
  validateShipmentName,
} from "../../../components/Validate";
function EditShipment({
  closeEditShipmentModal,
  openEditShipmentModal,
  editShipment,
  getShipmentList,
}) {
  const [name, setName] = useState(editShipment.shipmentUnit);
  const [description, setDescription] = useState(editShipment.description);
  const [status, setStatus] = useState(editShipment.status);
  const [cost, setCost] = useState(editShipment.shipmentCost);

  const handleEditShipment = () => {
    if (validateShipmentName(name) && validateShipmentCost(cost)) {
      const data = {
        shipmentUnit: name,
        description: description,
        shipmentCost: cost,
        status: status,
      };
      console.log(data);
      request("PUT", `/api/v1/shipment/${editShipment.id}`, data)
        .then((response) => {
          if (response.data.status === "200") {
            getShipmentList();
            closeEditShipmentModal();
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
  const handleCostChange = (event) => {
    setCost(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={closeEditShipmentModal}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">
          <p className="text-xl text-center mb-4 font-bold">
            Chỉnh sửa phương thức vận chuyển
          </p>
          <p className="font-bold">Tên phương thức vận chuyển</p>
          <input
            type="text"
            placeholder="Tên phương thức"
            value={name}
            onChange={handleNameChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-bold">Mô tả</p>
          <input
            type="text"
            placeholder="Mô tả"
            value={description}
            onChange={handleDescriptionChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-bold">Chi phí</p>
          <input
            type="number"
            placeholder="Chi phí"
            value={cost}
            onChange={handleCostChange}
            className="w-full mb-4 px-2 border border-gray-400"
          />
          <p className="font-bold">Trạng thái</p>
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
            onClick={handleEditShipment}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditShipment;
