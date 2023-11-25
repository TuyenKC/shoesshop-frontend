import React, { useState } from "react";
import { request } from "../../../axios_helper";
import {
  validateShipmentCost,
  validateShipmentName,
} from "../../../components/Validate";
import { toast } from "react-toastify";
function AddShipment({
  closeAddShipmentModal,
  openAddShipmentModal,
  getShipmentList,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [cost, setCost] = useState(0);
  const handleSaveShipment = () => {
    if (validateShipmentName(name) && validateShipmentCost(cost)) {
      const data = {
        shipmentUnit: name,
        description: description,
        shipmentCost: cost,
        status: status,
      };
      request("POST", "/api/v1/shipment", data)
        .then((response) => {
          if (response.data.status === "200") {
            getShipmentList();
            closeAddShipmentModal();
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
          onClick={closeAddShipmentModal}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">
          <p className="text-xl text-center mb-4 font-bold">
            Thêm phương thức vận chuyển
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
            onClick={handleSaveShipment}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddShipment;
